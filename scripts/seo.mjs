/**
 * Сборка SEO-слоя сайта: карта сайта и статические версии страниц.
 *
 * Зачем это нужно. Сайт — одностраничное приложение: сервер отдаёт один и тот же
 * пустой каркас на любой адрес, а весь текст, автомобили и цены рисует браузер.
 * Поисковик, который не выполняет скрипты (или выполняет их с задержкой), видит
 * пустой документ, поэтому страницы почти не индексируются.
 *
 * Что делает скрипт после `vite build`:
 *
 * 1. Забирает каталог автомобилей из Chatium — того же источника, что и сайт.
 * 2. Пишет `dist/sitemap.xml` со всеми страницами, включая страницы автомобилей:
 *    статический файл в public/ не мог их перечислить, потому что машины живут
 *    в каталоге и меняются без пересборки сайта.
 * 3. Кладёт настоящий текст и разметку schema.org в главную страницу (`dist/index.html`).
 *    Её отдают по корневому адресу, поэтому поисковик читает её без выполнения скриптов,
 *    а приложение заменяет этот блок собой, как только загрузится.
 *
 *    Так же поступить с остальными страницами нельзя: чтобы отдать `/catalog/bmw-x7-40d`
 *    готовым файлом, нужен каталог `dist/catalog/bmw-x7-40d/index.html`, а nginx на хостинге
 *    отвечает на такой запрос перенаправлением 301 на внутренний адрес с портом 8080 —
 *    страница ломается. Вложенные страницы остаются одностраничным приложением: поисковик
 *    получает их через обход по счётчику Метрики и отрисовку скриптов.
 *    Полноценное решение — отдача готового HTML с сервера, это отдельная работа на хостинге.
 *
 * Скрипт не должен ломать сборку: любая ошибка — предупреждение в лог, выход с кодом 0
 * и сайт без SEO-слоя, а не упавший деплой.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

const SITE_URL = "https://nixxon-auto.ru";
const CATALOG_URL = "https://avnhome2012.chatium.ru/premium-auto/catalog/api/public/cars";
const CATALOG_TIMEOUT_MS = 15000;

const PHONE = "+7 (916) 225-33-59";
const TELEGRAM = "https://t.me/nixon_motors";

/** Текст главной страницы — тот же, что видит посетитель. */
const HOME = {
  title: "Николаев Алексей — эксперт по премиальным автомобилям",
  description:
    "Подбор, покупка и импорт автомобилей премиум-класса. Более 20 лет в автомобильном бизнесе, более 1000 клиентов. Audi, BMW, Mercedes-Benz и выше.",
  heading: "Николаев Алексей — эксперт по премиальным автомобилям",
  lead: "Подбор, покупка и импорт автомобилей премиум-класса под ключ: от поиска машины до ключей в руках. Более 20 лет в автомобильном бизнесе, более 1000 клиентов.",
  services: [
    "Подбор автомобиля под задачу клиента",
    "Покупка под ключ",
    "Импорт автомобилей из Европы, Америки, Китая, Кореи, Японии и ОАЭ",
    "Проверка автомобиля и сопровождение сделки",
    "Логистика и таможенное оформление",
    "VIP-консьерж",
  ],
  guarantees: [
    "Расчёты через аккредитив Сбербанка",
    "Официальный договор",
    "Поэтапная оплата",
    "Проверка автомобиля до сделки",
  ],
};

const LEGAL_PAGES = [
  { path: "/privacy-policy", title: "Политика конфиденциальности — Николаев Premium auto" },
  { path: "/personal-data-consent", title: "Согласие на обработку персональных данных — Николаев Premium auto" },
  { path: "/consent", title: "Согласие на обработку данных — Николаев Premium auto" },
  { path: "/cookies", title: "Использование cookie — Николаев Premium auto" },
  { path: "/ai-regulation", title: "Правила использования ИИ — Николаев Premium auto" },
];

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Вставляем значение в атрибут content у метатега, создавая тег, если его нет. */
function setMeta(html, attribute, key, content) {
  const escaped = escapeHtml(content);
  const pattern = new RegExp(`<meta ${attribute}="${key}" content="[^"]*">`);
  if (pattern.test(html)) return html.replace(pattern, `<meta ${attribute}="${key}" content="${escaped}">`);
  return html.replace("</head>", `  <meta ${attribute}="${key}" content="${escaped}">\n  </head>`);
}

function setTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
}

function setCanonical(html, url) {
  return html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeHtml(url)}" />`);
}

function withSeo(html, page) {
  const url = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  let out = setTitle(html, page.title);
  out = setMeta(out, "name", "description", page.description ?? HOME.description);
  out = setCanonical(out, url);
  out = setMeta(out, "property", "og:title", page.title);
  out = setMeta(out, "property", "og:description", page.description ?? HOME.description);
  out = setMeta(out, "property", "og:url", url);
  if (page.image) out = setMeta(out, "property", "og:image", page.image);
  out = setMeta(out, "name", "twitter:title", page.title);
  out = setMeta(out, "name", "twitter:description", page.description ?? HOME.description);
  if (page.image) out = setMeta(out, "name", "twitter:image", page.image);
  return out;
}

/**
 * Статическая версия страницы: её читает поисковик, а человек видит доли секунды,
 * пока не загрузится приложение. Приложение занимает контейнер #root и заменяет
 * этот блок собой; на случай, если оно не загрузится, блок остаётся как обычная
 * страница с текстом и контактами.
 */
function snapshotBlock(content) {
  return `
      <div id="seo-snapshot" style="background:#0D0D0D;color:#EEECE8;font-family:Inter,system-ui,sans-serif;min-height:100vh;padding:48px 24px;line-height:1.6">
        <div style="max-width:820px;margin:0 auto">
          ${content}
          <p style="margin-top:40px;font-size:14px;color:#A19C91">
            Николаев | Premium auto — телефон <a href="tel:+79162253359" style="color:#D1B06B">${PHONE}</a>,
            Telegram <a href="${TELEGRAM}" style="color:#D1B06B">@nixon_motors</a>.
          </p>
        </div>
      </div>
      <script>
        // Приложение заменяет этот блок собой; если по какой-то причине не заменило —
        // убираем его, чтобы текст не дублировался на экране.
        (function () {
          var tries = 0;
          var timer = setInterval(function () {
            var root = document.getElementById("root");
            var block = document.getElementById("seo-snapshot");
            tries += 1;
            if (!block || !root) return clearInterval(timer);
            if (root.querySelector(":scope > *:not(#seo-snapshot)")) { block.remove(); clearInterval(timer); }
            if (tries > 60) clearInterval(timer);
          }, 200);
        })();
      </script>`;
}

function snapshotHtml(content) {
  return `<h1 style="font-family:'Playfair Display',Georgia,serif;font-size:34px;margin:0 0 16px">${content.heading}</h1>${content.body}`;
}

function list(items) {
  return `<ul style="padding-left:20px;margin:12px 0">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function carPage(car) {
  const name = [car.brand, car.model].filter(Boolean).join(" ");
  const title = `${name}${car.year ? `, ${car.year}` : ""} — купить под ключ | Николаев Premium auto`;
  const description = [car.description, car.priceCash ? `Цена: ${car.priceCash}.` : ""].filter(Boolean).join(" ");
  const body = `
          ${car.description ? `<p>${escapeHtml(car.description)}</p>` : ""}
          ${car.priceCash ? `<p style="font-size:20px;color:#D1B06B;margin:16px 0">${escapeHtml(car.priceCash)}${car.priceVat ? ` · с НДС ${escapeHtml(car.priceVat)}` : ""}</p>` : ""}
          <p>${[car.year ? `${car.year} год` : "", car.mileageText, car.statusLabel, car.classLabel].filter(Boolean).map(escapeHtml).join(" · ")}</p>
          ${car.specs?.length ? `<h2 style="font-size:20px;margin:24px 0 8px">Характеристики</h2>${list(car.specs.map(escapeHtml))}` : ""}
          ${car.descriptionFull ? car.descriptionFull.split(/\n{2,}/).map((part) => `<p>${escapeHtml(part)}</p>`).join("") : ""}
          <p><a href="/catalog" style="color:#D1B06B">Все автомобили в наличии и под заказ</a></p>`;
  return {
    path: `/catalog/${car.slug}`,
    title,
    description,
    image: car.photos?.[0]?.full,
    content: { heading: `${name}${car.year ? `, ${car.year}` : ""}`, body },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Car",
      name: `${name}${car.year ? `, ${car.year}` : ""}`,
      brand: car.brand ? { "@type": "Brand", name: car.brand } : undefined,
      vehicleModelDate: car.year ? String(car.year) : undefined,
      mileageFromOdometer: car.mileage ? { "@type": "QuantitativeValue", value: car.mileage, unitCode: "KMT" } : undefined,
      image: car.photos?.map((photo) => photo.full).slice(0, 4),
      description: car.description ?? undefined,
      offers: car.priceCash
        ? {
            "@type": "Offer",
            price: String(car.priceCash).replace(/[^\d]/g, ""),
            priceCurrency: "RUB",
            availability: car.status === "in_stock" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
            url: `${SITE_URL}/catalog/${car.slug}`,
            seller: { "@type": "AutoDealer", name: "Николаев | Premium auto", telephone: PHONE },
          }
        : undefined,
    },
  };
}

function catalogPage(cars) {
  const body = `
          <p>Премиальные автомобили в наличии и в поставке: подбор под задачу, проверка до сделки, покупка под ключ, импорт из Европы, Америки, Китая, Кореи, Японии и ОАЭ.</p>
          ${list(
            cars.map(
              (car) =>
                `<a href="/catalog/${car.slug}" style="color:#D1B06B">${escapeHtml([car.brand, car.model].filter(Boolean).join(" "))}</a>${car.year ? `, ${car.year}` : ""}${car.priceCash ? ` — ${escapeHtml(car.priceCash)}` : ""}${car.statusLabel ? ` (${escapeHtml(car.statusLabel)})` : ""}`,
            ),
          )}`;
  return {
    path: "/catalog",
    title: "Автомобили в наличии и под заказ — Николаев Premium auto",
    description:
      "Премиальные автомобили в наличии и в поставке: BMW, Mercedes-Benz, Porsche, Range Rover, Bentley. Подбор, проверка, покупка под ключ и импорт.",
    content: { heading: "Автомобили в наличии и под заказ", body },
    jsonLd: cars.length
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: cars.map((car, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/catalog/${car.slug}`,
            name: [car.brand, car.model].filter(Boolean).join(" "),
          })),
        }
      : undefined,
  };
}

function homePage() {
  const body = `
          <p>${escapeHtml(HOME.lead)}</p>
          <h2 style="font-size:20px;margin:24px 0 8px">Услуги</h2>
          ${list(HOME.services.map(escapeHtml))}
          <h2 style="font-size:20px;margin:24px 0 8px">Ваши деньги под защитой</h2>
          ${list(HOME.guarantees.map(escapeHtml))}
          <p><a href="/catalog" style="color:#D1B06B">Автомобили в наличии и под заказ</a></p>`;
  return {
    path: "/",
    title: HOME.title,
    description: HOME.description,
    content: { heading: HOME.heading, body },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AutoDealer",
      name: "Николаев | Premium auto",
      url: SITE_URL,
      telephone: PHONE,
      email: "hello@nikolaev-auto.ru",
      areaServed: "Россия",
      founder: { "@type": "Person", name: "Алексей Николаев", jobTitle: "Эксперт по премиальным автомобилям" },
      sameAs: [TELEGRAM],
    },
  };
}

async function fetchCars() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CATALOG_TIMEOUT_MS);
  try {
    const response = await fetch(CATALOG_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`каталог ответил ${response.status}`);
    const data = await response.json();
    const cars = Array.isArray(data?.cars) ? data.cars : [];
    console.log(`[seo] каталог получен: ${cars.length} автомобилей`);
    return cars;
  } catch (error) {
    console.warn(`[seo] каталог недоступен (${error.message}): карта сайта собрана без страниц автомобилей`);
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Готовый текст ставим только в главную страницу: её отдаёт корневой index.html.
 * Для остальных адресов каталог с index.html внутри ломает выдачу — nginx отвечает
 * на такой запрос перенаправлением на внутренний порт (см. комментарий в начале файла).
 */
async function writeHomePage(template, page) {
  let html = withSeo(template, page);
  const block = snapshotBlock(snapshotHtml(page.content));
  const script = page.jsonLd ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>` : "";
  html = html.replace('<div id="root"></div>', `<div id="root">${block}</div>\n    ${script}`);
  await writeFile(path.join(DIST, "index.html"), html, "utf8");
}

function sitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((page) => {
      const loc = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
      return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${page.priority}</priority></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const templatePath = path.join(DIST, "index.html");
  const template = await readFile(templatePath, "utf8");
  const cars = await fetchCars();

  const pages = [
    { ...homePage(), priority: "1.0" },
    { ...catalogPage(cars), priority: "0.9" },
    ...cars.map((car) => ({ ...carPage(car), priority: "0.8" })),
    { path: "/stock", title: "Автомобили в наличии — Николаев Premium auto", priority: "0.6" },
    { path: "/order", title: "Автомобили в поставке — Николаев Premium auto", priority: "0.6" },
    ...LEGAL_PAGES.map((page) => ({ ...page, priority: "0.2" })),
  ];

  await writeHomePage(template, pages[0]);
  await writeFile(path.join(DIST, "sitemap.xml"), sitemap(pages), "utf8");
  console.log(`[seo] карта сайта и текст главной готовы: ${pages.length} адресов`);
}

main().catch((error) => {
  console.warn(`[seo] SEO-слой не собран: ${error.message}`);
});
