import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { METRIKA_COUNTER_ID } from "./site";

/**
 * Аналитика сайта: Яндекс.Метрика и её цели.
 *
 * Номер счётчика задаётся в src/lib/site.ts. Пока он пустой, все вызовы молча
 * ничего не делают — код можно держать в проекте до подключения счётчика.
 *
 * Имена целей совпадают с теми, что заводятся в интерфейсе Метрики: если
 * поменять их здесь, надо поменять и там, иначе события не будут считаться.
 */

export const GOALS = {
  /** Отправлена заявка через форму */
  formSent: "form_sent",
  /** Клик по ссылке в мессенджер (Telegram, Max) */
  messenger: "messenger_click",
  /** Клик по телефону */
  phone: "phone_click",
  /** Открыта страница автомобиля */
  carView: "car_view",
  /** Нажали «Читать дальше» — читают подробное описание */
  readMore: "read_more",
  /** Выбрана категория в фильтре каталога */
  filterClick: "filter_click",
  /** Ответили на первый вопрос квиза: человек начал работу, а не просто зашёл */
  quizStart: "quiz_start",
  /** Заявка отправлена из квиза: видно, что канал довёл человека до конца */
  quizSent: "quiz_sent",
} as const;

export type GoalName = (typeof GOALS)[keyof typeof GOALS];

type YandexMetrika = {
  (counterId: number, action: string, ...args: unknown[]): void;
  /** Очередь вызовов до загрузки счётчика. */
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexMetrika;
  }
}

const counterId = Number(METRIKA_COUNTER_ID);

/**
 * Повтор того же события в течение секунды не отправляем: страница может
 * перерисоваться, и цель ушла бы дважды. Осознанные повторы (человек ещё раз
 * нажал категорию через минуту) считаются как обычно.
 */
const DEDUP_MS = 1000;
const recentGoals = new Map<string, number>();

export function reachGoal(goal: GoalName, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !counterId) return;

  const key = `${goal}:${JSON.stringify(params ?? {})}`;
  const now = Date.now();
  const previous = recentGoals.get(key);
  if (previous !== undefined && now - previous < DEDUP_MS) return;
  recentGoals.set(key, now);

  window.ym?.(counterId, "reachGoal", goal, params);
}

/** Последняя отправленная страница: повторный вызов с тем же адресом пропускаем. */
let lastHitUrl: string | null = null;

/** Просмотр страницы: у одностраничного сайта переходы не видны Метрике сами. */
function trackPageView(url: string): void {
  if (typeof window === "undefined" || !counterId) return;
  if (lastHitUrl === url) return;
  lastHitUrl = url;
  window.ym?.(counterId, "hit", url, { title: document.title });
}

/**
 * Счётчик подключается один раз при первом открытии сайта.
 *
 * Порядок как в коде, который выдаёт сама Метрика: сначала заглушка, потом
 * загрузка tag.js с номером счётчика в адресе, потом инициализация. Вызовы,
 * сделанные до загрузки, копятся в очереди и выполняются, когда счётчик готов —
 * без заглушки инициализация просто терялась.
 *
 * `ssr: true` отключает автоматический просмотр: у одностраничного сайта
 * просмотры отправляет сам код (см. useAnalytics), иначе первый экран
 * посчитался бы дважды.
 */
function installCounter(): void {
  if (typeof document === "undefined" || !counterId) return;
  if (document.getElementById("ya-metrika")) return;

  installStub();

  const script = document.createElement("script");
  script.id = "ya-metrika";
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
  document.head.appendChild(script);

  window.ym?.(counterId, "init", {
    ssr: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

/** Заглушка из стандартного кода счётчика: собирает вызовы до загрузки tag.js. */
function installStub(): void {
  const w = window;
  if (w.ym) return;

  const stub = function (...args: unknown[]) {
    stub.a = stub.a ?? [];
    stub.a.push(args);
  } as YandexMetrika;
  stub.l = Date.now();
  w.ym = stub;
}

/**
 * Считает клики по телефону и мессенджерам. Один обработчик на весь документ:
 * такие ссылки есть в шапке, в подвале, в форме и в блоках, и дублировать код
 * в каждом месте не нужно.
 */
function installClickTracking(): () => void {
  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) {
      reachGoal(GOALS.phone);
      return;
    }
    if (/(?:^|\.)t\.me\/|telegram\.me\//i.test(href) || /(?:^|\.)max\.ru\//i.test(href)) {
      reachGoal(GOALS.messenger);
    }
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}

/**
 * Подключение аналитики к странице: счётчик, клики по контактам и просмотры
 * страниц. Вызывается один раз в приложении, внутри роутера.
 */
export function useAnalytics(): void {
  const location = useLocation();

  useEffect(() => {
    installCounter();
    return installClickTracking();
  }, []);

  useEffect(() => {
    trackPageView(window.location.href);
  }, [location.pathname, location.search]);
}
