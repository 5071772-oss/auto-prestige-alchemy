import { CAR_CLASSES } from "./car-classes";
import type { StockCar } from "./stock";

export interface CatalogFilter {
  /** Значение категории: оно уходит в адрес страницы. */
  value: string;
  label: string;
  kind: "class" | "brand";
  /** Сколько автомобилей в категории — показываем рядом с названием. */
  count: number;
}

/**
 * Категории для фильтра собираются из самих автомобилей: добавили машину новой
 * марки — её название само появилось в фильтре, убрали последнюю — исчезло.
 * Классы идут первыми, дальше марки по алфавиту.
 */
export function catalogFilters(cars: StockCar[]): CatalogFilter[] {
  const classes: CatalogFilter[] = CAR_CLASSES.map((item) => ({
    value: item.id,
    label: item.label,
    kind: "class" as const,
    count: cars.filter((car) => car.carClass === item.id).length,
  })).filter((item) => item.count > 0);

  const makes = Array.from(new Set(cars.map((car) => car.make))).sort((a, b) => a.localeCompare(b, "ru"));

  const brands: CatalogFilter[] = makes.map((make) => ({
    value: make,
    label: make,
    kind: "brand" as const,
    count: cars.filter((car) => car.make === make).length,
  }));

  return [...classes, ...brands];
}

/** Адрес страницы с выбранной категорией; без категории — весь каталог. */
export function catalogFilterUrl(filter: CatalogFilter | null): string {
  if (!filter) return "/catalog";
  if (filter.kind === "class") return `/catalog?class=${filter.value}`;
  return `/catalog?brand=${encodeURIComponent(filter.value)}`;
}

/** Выбранная категория по адресу страницы — для подсветки в фильтре. */
export function filterFromSearch(
  filters: CatalogFilter[],
  classId: string | null,
  brand: string | null,
): CatalogFilter | null {
  if (classId) return filters.find((item) => item.kind === "class" && item.value === classId) ?? null;
  if (brand) return filters.find((item) => item.kind === "brand" && item.value === brand) ?? null;
  return null;
}
