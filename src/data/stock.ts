export type StockCar = {
  id: string
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
    make: "Mercedes-AMG",
    model: "G 63",
    year: 2025,
    mileage: 900,
    price_cash: "27 750 000 ₽",
    price_vat: "по запросу",
    status: "В поставке",
    specs: "4.0-литровый V8 битурбо AMG с гибридной системой 48V ISG · 585 л.с. · 850 Н·м\n9-ступенчатый AMG SPEEDSHIFT TCT 9G\nПостоянный полный привод с тремя блокируемыми дифференциалами\nПакет Night Package · электрическая выдвижная подножка\nДвухцветный салон с отделкой кожей Nappa\nМультиконтурные сиденья с массажем, вентиляцией и подогревом\nАудиосистема Burmester · панорамная крыша\nКамера 360° · адаптивный круиз-контроль",
    description: "Mercedes-AMG G 63 в поставке — культовый внедорожник с мощным V8, пакетом Night Package и двухцветным салоном Nappa.",
    images: [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/g%2063%20310826/photo_2026-08-31_15-03-05.jpg",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/g%2063%20310826/photo_2026-08-31_15-02-24.jpg",
    ],
  },
]
