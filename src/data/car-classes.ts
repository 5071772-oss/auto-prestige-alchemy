/**
 * Классы автомобилей — то, из чего собрано меню «Автомобили».
 *
 * Раньше в меню было три раздела по состоянию машины: «В наличии», «Заказ»
 * и «Каталог». Теперь клиент выбирает класс автомобиля, а состояние видно
 * в самой карточке.
 */

export type CarClassId = "premium" | "luxury" | "exclusive";

export interface CarClass {
  id: CarClassId;
  /** Название в меню и на странице класса. */
  label: string;
  /** Короткая подпись: какие марки попадают в класс. */
  hint: string;
  /** Абзац под заголовком страницы класса. */
  description: string;
}

export const CAR_CLASSES: CarClass[] = [
  {
    id: "premium",
    label: "Премиум",
    hint: "Audi · BMW · Mercedes-Benz",
    description:
      "Топовые модели премиальных марок: седаны, кроссоверы и внедорожники представительского класса.",
  },
  {
    id: "luxury",
    label: "Лакшери",
    hint: "Porsche · Range Rover · Mercedes-AMG",
    description:
      "Автомобили для себя: мощные версии, максимальные комплектации и статус без компромиссов.",
  },
  {
    id: "exclusive",
    label: "Эксклюзив",
    hint: "Bentley · Maybach · Maserati и выше",
    description:
      "Редкие и лимитированные автомобили, которых нет в свободной продаже: подбираю под запрос из закрытых источников.",
  },
];

/** Адрес страницы класса — на неё ведёт пункт меню «Автомобили». */
export function carClassUrl(id: CarClassId): string {
  return `/catalog?class=${id}`;
}

/** Класс по значению `class` из адреса страницы; неизвестное значение — не класс. */
export function carClassById(id: string | null | undefined): CarClass | null {
  if (!id) return null;
  return CAR_CLASSES.find((item) => item.id === id) ?? null;
}

/** Название класса автомобиля для карточки. */
export function carClassLabel(id: CarClassId | undefined): string {
  return CAR_CLASSES.find((item) => item.id === id)?.label ?? "";
}
