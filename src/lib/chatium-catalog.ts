import { useEffect, useMemo, useState } from "react";
import { stockCars, type StockCar } from "@/data/stock";
import type { CarClassId } from "@/data/car-classes";

/**
 * Каталог автомобилей живёт в Chatium: там его правят, оттуда берут данные
 * цены, характеристики и фотографии. Сайт только показывает.
 *
 * Данные забирает браузер посетителя: у сайта нет своего сервера, а приём
 * каталога открыт всем. Если Chatium недоступен, показываем встроенный
 * запасной набор (`src/data/stock.ts`) — каталог не пропадает.
 */

const CATALOG_URL = "https://avnhome2012.chatium.ru/premium-auto/catalog/api/public/cars";

/** Копия каталога в браузере: следующая страница открывается уже с данными. */
const CACHE_KEY = "nixxon-catalog-v1";
const CACHE_TTL_MS = 30 * 60 * 1000;
const TIMEOUT_MS = 10_000;

interface ApiPhoto {
  hash: string;
  card: string;
  full: string;
}

interface ApiCar {
  id: string;
  slug: string;
  brand: string;
  model: string;
  title: string;
  year: number | null;
  mileage: number | null;
  mileageText: string;
  priceCash: string;
  priceVat: string | null;
  status: string;
  statusLabel: string;
  carClass: string;
  classLabel: string;
  description: string | null;
  specs: string[];
  photos: ApiPhoto[];
}

interface ApiResponse {
  version: number;
  count: number;
  updatedAt: string;
  cars: ApiCar[];
}

const CLASS_IDS: CarClassId[] = ["premium", "luxury", "exclusive"];

export function isCarClassId(value: unknown): value is CarClassId {
  return typeof value === "string" && (CLASS_IDS as string[]).includes(value);
}

/** Адрес страницы автомобиля: кириллица и пробелы в ссылке не нужны. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Данные Chatium → то, что рисует страница. */
function toStockCar(car: ApiCar): StockCar {
  return {
    id: car.id,
    slug: car.slug || slugify(car.title),
    carClass: isCarClassId(car.carClass) ? car.carClass : undefined,
    make: car.brand,
    model: car.model,
    year: car.year ?? 0,
    mileage: car.mileage ?? 0,
    price_cash: car.priceCash,
    ...(car.priceVat ? { price_vat: car.priceVat } : {}),
    status: car.statusLabel,
    specs: car.specs.join("\n"),
    description: car.description ?? "",
    // Карточке хватает 560 px, крупному просмотру — 1600 px
    images: car.photos.map((photo) => photo.card),
    imagesFull: car.photos.map((photo) => photo.full),
  };
}

async function fetchCatalog(): Promise<StockCar[] | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(CATALOG_URL, {
      headers: { accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as ApiResponse;
    if (!Array.isArray(payload?.cars)) return null;
    return payload.cars.map(toStockCar);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function readCache(): StockCar[] | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at?: number; cars?: StockCar[] };
    if (!parsed?.cars?.length) return null;
    if (typeof parsed.at === "number" && Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed.cars;
  } catch {
    return null;
  }
}

function writeCache(cars: StockCar[]): void {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), cars }));
  } catch {
    // приватный режим или переполненное хранилище — обойдёмся без копии
  }
}

export interface CatalogState {
  cars: StockCar[];
  /** Данные приехали из Chatium */
  fromChatium: boolean;
  loading: boolean;
}

/**
 * Каталог для страницы: сначала показываем сохранённую копию или запасной
 * набор, затем подставляем свежие данные из Chatium.
 */
export function useCatalog(): CatalogState {
  const cached = useMemo(readCache, []);
  const [state, setState] = useState<CatalogState>({
    cars: cached ?? stockCars,
    fromChatium: Boolean(cached),
    loading: !cached,
  });

  useEffect(() => {
    let alive = true;
    void (async () => {
      const cars = await fetchCatalog();
      if (!alive) return;
      if (cars) {
        writeCache(cars);
        setState({ cars, fromChatium: true, loading: false });
        return;
      }
      setState((previous) => ({ ...previous, loading: false }));
    })();
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
