/** Канонический адрес сайта: canonical, og:url, карта сайта. */
export const SITE_URL = "https://nixxon-auto.ru";

/**
 * Номер счётчика Яндекс.Метрики. Пустая строка — счётчик не подключается.
 *
 * Счётчик «Николаев | Premium auto — nixxon-auto.ru» (113429806) принимает данные
 * только с адресов nixxon-auto.ru. Цели заводятся в интерфейсе Метрики с теми же
 * идентификаторами, что перечислены в src/lib/analytics.ts.
 */
export const METRIKA_COUNTER_ID = "113429806";

export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
