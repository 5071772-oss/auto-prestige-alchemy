/** Канонический адрес сайта: canonical, og:url, карта сайта. */
export const SITE_URL = "https://nixxon-auto.ru";

/**
 * Номер счётчика Яндекс.Метрики. Пустая строка — счётчик не подключается.
 *
 * Счётчик создаётся в Метрике на адрес nixxon-auto.ru; данные чужого счётчика
 * (например, от проекта электромобилей) этот сайт не принимает. Цели заводятся
 * в интерфейсе Метрики с теми же идентификаторами, что перечислены
 * в src/lib/analytics.ts.
 */
export const METRIKA_COUNTER_ID = "";

export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
