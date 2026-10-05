/**
 * Заявка уходит в Chatium: там она сохраняется, её видно в кабинете заявок
 * проекта, оттуда же о ней уходит письмо и создаётся сделка в Битрикс24.
 *
 * Раньше форма отправляла данные в веб-форму amoCRM скрытым iframe: сайт не знал,
 * приняли заявку или нет, а клиент видел «успех» даже при сбое. Теперь ответ
 * приёма заявок настоящий, поэтому и подтверждение честное.
 */

const INTAKE_URL = "https://avnhome2012.chatium.ru/premium-auto/leads/api/public/create";

/** Версия согласия: меняется вместе с текстом согласия на сайте. */
const CONSENT_VERSION = "1.0";

const TIMEOUT_MS = 15000;

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  /** Автомобиль, которым интересуется клиент: приходит со страницы наличия */
  model?: string;
  /** Комментарий клиента из формы */
  message?: string;
  pageUrl?: string;
  formName?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  /** Скрытое поле-ловушка: человек его не заполняет */
  company?: string;
}

export type LeadResult = { ok: true; id: string | null } | { ok: false; error: string };

/** UTM-метки из адреса страницы: по ним в кабинете заявок видно, что принесло клиента. */
export function utmFromLocation(): Pick<
  LeadPayload,
  "utmSource" | "utmMedium" | "utmCampaign" | "utmContent" | "utmTerm"
> {
  const params = new URLSearchParams(window.location.search);
  const value = (key: string): string | undefined => {
    const raw = params.get(key)?.trim();
    return raw ? raw.slice(0, 300) : undefined;
  };
  return {
    utmSource: value("utm_source"),
    utmMedium: value("utm_medium"),
    utmCampaign: value("utm_campaign"),
    utmContent: value("utm_content"),
    utmTerm: value("utm_term"),
  };
}

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(INTAKE_URL, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        ...payload,
        consentVersion: CONSENT_VERSION,
        consentAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });
  } catch {
    return { ok: false, error: "Приём заявок недоступен" };
  } finally {
    clearTimeout(timer);
  }

  const text = await response.text();
  let body: { ok?: boolean; id?: string; error?: string } | null = null;
  try {
    body = JSON.parse(text) as { ok?: boolean; id?: string; error?: string };
  } catch {
    body = null;
  }

  if (!response.ok || !body?.ok) {
    return { ok: false, error: body?.error ?? `Приём заявок ответил ${response.status}` };
  }
  return { ok: true, id: body.id ?? null };
}
