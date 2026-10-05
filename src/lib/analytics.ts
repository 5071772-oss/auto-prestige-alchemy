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
} as const;

export type GoalName = (typeof GOALS)[keyof typeof GOALS];

type YandexMetrika = (counterId: number, action: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    ym?: YandexMetrika;
  }
}

const counterId = Number(METRIKA_COUNTER_ID);

/** Событие цели: «отправил заявку», «позвонил», «открыл автомобиль». */
export function reachGoal(goal: GoalName, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !counterId) return;
  window.ym?.(counterId, "reachGoal", goal, params);
}

/** Просмотр страницы: у одностраничного сайта переходы не видны Метрике сами. */
function trackPageView(url: string): void {
  if (typeof window === "undefined" || !counterId) return;
  window.ym?.(counterId, "hit", url, { title: document.title });
}

/**
 * Счётчик подключается один раз при первом открытии сайта.
 * Код счётчика — стандартный, с картой кликов и вебвизором.
 */
function installCounter(): void {
  if (typeof document === "undefined" || !counterId) return;
  if (document.getElementById("ya-metrika")) return;

  const script = document.createElement("script");
  script.id = "ya-metrika";
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  script.onload = () => {
    window.ym?.(counterId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  };
  document.head.appendChild(script);
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
