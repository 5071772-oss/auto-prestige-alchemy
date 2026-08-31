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
    id: "rolls-royce-cullinan-series-ii-2026",
    make: "Rolls-Royce",
    model: "Cullinan · Series II",
    year: 2026,
    mileage: 35,
    price_cash: "47 100 000 ₽",
    status: "В процессе заказа",
    specs: "6.75-литровый V12 · 571 л.с. · 850 Н·м\n8-ступенчатая АКПП ZF · полный привод\nРазгон 0–100 км/ч: 5,1 секунды\nСалон: Havana / Iceland Moss\nПневмоподвеска Magic Carpet Ride\nПотолок Starlight Headliner\nBespoke Audio · камеры 360° · адаптивный круиз-контроль",
    description: "Rolls-Royce Cullinan Series II с индивидуальной отделкой Bespoke и редкой конфигурацией салона.",
    images: [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/1-1.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/1-2.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/1-3.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/1-4.webp",
    ],
  },
]
