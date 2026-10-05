/**
 * Классы автомобилей.
 *
 * Класс — одна из категорий, по которым клиент выбирает машину на странице
 * «Автомобили». Рядом с классами там же стоят марки: их список собирается
 * из самих автомобилей (см. `catalog-filters.ts`).
 */

export type CarClassId = "premium" | "luxury" | "exclusive";

export interface CarClass {
  id: CarClassId;
  /** Название категории в фильтре. */
  label: string;
  /** Короткая подпись: какие марки попадают в класс. */
  hint: string;
}

export const CAR_CLASSES: CarClass[] = [
  {
    id: "premium",
    label: "Премиум",
    hint: "Audi · BMW · Mercedes-Benz",
  },
  {
    id: "luxury",
    label: "Лакшери",
    hint: "Porsche · Range Rover · Mercedes-AMG",
  },
  {
    id: "exclusive",
    label: "Эксклюзив",
    hint: "Bentley · Maybach · Maserati и выше",
  },
];

/** Класс по значению `class` из адреса страницы; неизвестное значение — не класс. */
export function carClassById(id: string | null | undefined): CarClass | null {
  if (!id) return null;
  return CAR_CLASSES.find((item) => item.id === id) ?? null;
}
