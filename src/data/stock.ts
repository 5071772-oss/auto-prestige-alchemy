import type { CarClassId } from "./car-classes"

export type StockCar = {
  id: string
  /** Класс автомобиля: по нему собрано меню «Автомобили». Пусто — машина видна только в полном каталоге. */
  carClass?: CarClassId
  make: string
  model: string
  year: number
  mileage: number
  price_cash: string
  price_vat?: string
  status: string
  specs: string
  description: string
  images: string[]
}

export const stockCars: StockCar[] = [
  {
    id: "bmw-x7-40d-2025",
    carClass: "premium",
    make: "BMW",
    model: "X7 40D",
    year: 2025,
    mileage: 0,
    price_cash: "16 200 000 ₽",
    price_vat: "19 278 000 ₽",
    status: "В наличии",
    specs: "Европа\nДизель · 3.0 литра · 340 л.с.\nЦвет: Чёрный сапфир\nСалон: Чёрный\nСостояние: Новый автомобиль",
    description: "Новый BMW X7 40D из Европы с нулевым пробегом и премиальной комплектацией.",
    images: [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-27.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-28.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-29.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-32.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-33.webp",
    ],
  },
  {
    id: "mercedes-amg-g63-2025-order",
    carClass: "luxury",
    make: "Mercedes-AMG",
    model: "G 63",
    year: 2025,
    mileage: 900,
    price_cash: "27 750 000 ₽",
    price_vat: "по запросу",
    status: "В поставке",
    specs: "4.0-литровый V8 битурбо AMG с гибридной системой 48V ISG · 585 л.с. · 850 Н·м\n9-ступенчатый AMG SPEEDSHIFT TCT 9G\nПостоянный полный привод с тремя блокируемыми дифференциалами\nПакет Night Package — затемнённые элементы экстерьера и оптика\nЭлектрическая выдвижная подножка\nДвухцветный салон с отделкой кожей Nappa\nМультиконтурные сиденья с массажем, вентиляцией и подогревом\nАудиосистема Burmester · панорамная крыша\nКамера 360° · адаптивный круиз-контроль",
    description: "Mercedes-AMG G 63 в поставке — культовый внедорожник с мощным V8, пакетом Night Package и двухцветным салоном Nappa.",
    images: [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/g%2063%20310826/photo_2026-08-31_15-03-05.jpg",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/g%2063%20310826/photo_2026-08-31_15-02-24.jpg",
    ],
  },
  {
    id: "mercedes-benz-s450-4matic-2026-order",
    carClass: "premium",
    make: "Mercedes-Benz",
    model: "S-Class S450 4MATIC",
    year: 2026,
    mileage: 0,
    price_cash: "27 500 000 ₽",
    price_vat: "32 725 000 ₽",
    status: "В поставке",
    specs: "Европа · рестайлинг\nБензин · 3.0 литра · 381 л.с.\nЦвет: Чёрный\nСалон: Tartufo\nСостояние: Новый автомобиль",
    description: "Новый Mercedes-Benz S-Class S450 4MATIC 2026 года из Европы в чёрном кузове с салоном Tartufo.",
    images: [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/s%20580%20310826/photo_2026-08-31_17-07-59.jpg",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/s%20580%20310826/photo_2026-08-27_12-45-06.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/s%20580%20310826/photo_2026-08-27_12-45-08.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/s%20580%20310826/photo_2026-08-27_12-45-09.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/s%20580%20310826/photo_2026-08-27_12-45-10.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/s%20580%20310826/photo_2026-08-27_12-45-11.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/s%20580%20310826/photo_2026-08-27_12-45-12.webp",
    ],
  },
]
