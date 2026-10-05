import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Phone,
  Send,
  ArrowLeft,
  Gauge,
  Calendar,
} from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import LeadForm from "@/components/LeadForm";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { MESSENGER_MAX_URL, PHONE, PHONE_FORMATTED, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/brand";
import { useCatalog } from "@/lib/chatium-catalog";
import { useSeo } from "@/lib/seo";
import { GOALS, reachGoal } from "@/lib/analytics";

/**
 * Страница автомобиля: своя ссылка у каждой машины (/catalog/bmw-x7-40d).
 * Нужна, чтобы на конкретный автомобиль можно было вести рекламу, а поисковики
 * находили его по марке и модели.
 */
export default function Car() {
  const { slug = "" } = useParams();
  const { cars, loading } = useCatalog();
  const car = useMemo(() => cars.find((item) => item.slug === slug), [cars, slug]);

  const [photo, setPhoto] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const photos = car?.images?.length ? car.images : [];
  const photosFull = car?.imagesFull?.length === photos.length ? car.imagesFull : photos;
  const title = car ? `${car.make} ${car.model}` : "Автомобиль";

  /** Подробное описание разбито на абзацы пустой строкой. */
  const fullParagraphs = useMemo(
    () =>
      (car?.descriptionFull ?? "")
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    [car],
  );

  useSeo({
    title: car
      ? `${title}${car.year ? `, ${car.year}` : ""} — купить под ключ | Николаев Premium auto`
      : "Автомобиль — Николаев Premium Auto",
    description: car
      ? [car.description, car.price_cash ? `Цена: ${car.price_cash}.` : ""].filter(Boolean).join(" ")
      : "Подбор, покупка и импорт автомобилей премиум-класса.",
    path: `/catalog/${slug}`,
    image: photos.length ? photosFull[0] : undefined,
  });

  // Открытие страницы автомобиля — отдельная цель: по ней видно, какие машины смотрят
  useEffect(() => {
    if (car) reachGoal(GOALS.carView, { car: `${car.make} ${car.model}` });
  }, [car]);

  useEffect(() => {
    setPhoto(0);
    setExpanded(false);
  }, [slug]);

  const toggleDescription = () => {
    const next = !expanded;
    setExpanded(next);
    if (next) reachGoal(GOALS.readMore, { car: title });
  };

  const others = useMemo(
    () => cars.filter((item) => item.slug !== slug).slice(0, 3),
    [cars, slug],
  );

  const step = (delta: number) => {
    if (photos.length < 2) return;
    setPhoto((current) => (current + delta + photos.length) % photos.length);
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 py-40 text-center">
          <h1 className="font-display text-3xl text-gradient-soft sm:text-4xl">
            {loading ? "Открываю автомобиль…" : "Такого автомобиля нет в каталоге"}
          </h1>
          {loading ? null : (
            <p className="max-w-lg text-sm text-muted-foreground">
              Возможно, он уже продан или ссылка устарела. Посмотрите, что есть сейчас.
            </p>
          )}
          <Link
            to="/catalog"
            className="inline-flex h-12 items-center gap-2 border border-border px-6 text-xs uppercase tracking-[0.2em] transition-smooth hover:border-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Все автомобили
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="pt-32">
        <div className="container">
          <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="transition-smooth hover:text-foreground">Главная</Link>
            <span aria-hidden="true">/</span>
            <Link to="/catalog" className="transition-smooth hover:text-foreground">Автомобили</Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground/80">{title}</span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_1fr]">
            {/* Фотографии */}
            <div>
              <div className="relative aspect-[4/3] overflow-hidden border border-border bg-graphite-deep">
                {photos.length ? (
                  <img
                    src={photosFull[photo]}
                    alt={`${title} — фотография ${photo + 1} из ${photos.length}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Фотографии готовятся
                  </div>
                )}

                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Предыдущее фото"
                      onClick={() => step(-1)}
                      className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="Следующее фото"
                      onClick={() => step(1)}
                      className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {photos.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {photos.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      aria-label={`Показать фото ${index + 1}`}
                      onClick={() => setPhoto(index)}
                      className={`h-16 w-24 shrink-0 overflow-hidden border transition-smooth ${
                        index === photo ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* О автомобиле */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary">
                  {car.status || "В наличии"}
                </span>
                {car.carClass ? (
                  <span className="border border-border px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {car.carClass === "premium" ? "Премиум" : car.carClass === "luxury" ? "Лакшери" : "Эксклюзив"}
                  </span>
                ) : null}
              </div>

              <h1 className="font-display mt-6 text-4xl leading-tight text-gradient-soft sm:text-5xl">
                {title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {car.year ? (
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                    {car.year}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-primary" aria-hidden="true" />
                  {new Intl.NumberFormat("ru-RU").format(car.mileage)} км
                </span>
              </div>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-border bg-graphite-deep p-5">
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Наличные</dt>
                  <dd className="mt-2 text-xl font-medium text-foreground">{car.price_cash}</dd>
                </div>
                {car.price_vat ? (
                  <div className="border border-border bg-graphite-deep p-5">
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">С НДС</dt>
                    <dd className="mt-2 text-xl font-medium text-foreground">{car.price_vat}</dd>
                  </div>
                ) : null}
              </dl>

              {car.description ? (
                <p className="mt-8 text-base leading-relaxed text-muted-foreground">{car.description}</p>
              ) : null}

              {/* Подробное описание: показывается по кнопке, чтобы страница не превращалась в полотно */}
              {car.descriptionFull ? (
                <div className="mt-6">
                  <div
                    id="full-description"
                    className={`grid transition-all duration-500 ${
                      expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                    aria-hidden={!expanded}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-4 border-l border-primary/30 pl-6">
                        {fullParagraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-foreground/85">
                            {paragraph}
                          </p>
                        ))}
                        <div className="flex flex-wrap gap-3 pt-2">
                          <a
                            href="#contact"
                            className="inline-flex h-12 items-center border border-primary bg-primary/10 px-6 text-xs uppercase tracking-[0.2em] text-primary transition-smooth hover:bg-primary hover:text-primary-foreground"
                          >
                            Оставить заявку
                          </a>
                          <a
                            href={`tel:${PHONE}`}
                            className="inline-flex h-12 items-center gap-3 border border-border px-6 text-sm transition-smooth hover:border-primary"
                          >
                            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                            {PHONE_FORMATTED}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls="full-description"
                    onClick={toggleDescription}
                    className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {expanded ? "Свернуть" : "Читать дальше"}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex h-12 items-center gap-3 border border-border px-6 text-sm transition-smooth hover:border-primary"
                >
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  {PHONE_FORMATTED}
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-3 border border-border px-6 text-sm transition-smooth hover:border-primary"
                >
                  <Send className="h-4 w-4 text-primary" aria-hidden="true" />
                  {TELEGRAM_HANDLE}
                </a>
                <a
                  href={MESSENGER_MAX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-3 border border-border px-6 text-sm transition-smooth hover:border-primary"
                >
                  <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                  Max
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Характеристики */}
        {car.specs ? (
          <section className="container mt-24">
            <SectionLabel>Характеристики</SectionLabel>
            <ul className="mt-8 grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {car.specs
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => (
                  <li key={line} className="border-b border-border pb-3 text-sm text-foreground/90">
                    {line}
                  </li>
                ))}
            </ul>
          </section>
        ) : null}

        {/* Заявка */}
        <section id="contact" className="mt-28 border-t border-border bg-graphite-deep/40 py-24">
          <div className="container grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionLabel>Заявка на автомобиль</SectionLabel>
              <h2 className="font-display mt-8 text-4xl leading-[1.1] text-gradient-soft sm:text-5xl">
                Забрать <span className="italic text-gradient-gold">{title}?</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                Оставьте заявку — свяжусь лично, расскажу всё об этом автомобиле и покажу, что ещё есть
                под ваш запрос из закрытых дилерских баз.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="border border-border bg-background p-6 shadow-2xl sm:p-10">
                <LeadForm defaultModel={title} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Другие автомобили */}
        {others.length ? (
          <section className="container py-24">
            <SectionLabel>Ещё в каталоге</SectionLabel>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <Link
                  key={item.id}
                  to={`/catalog/${item.slug}`}
                  className="group border border-border bg-graphite-deep transition-smooth hover:border-primary/40"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={`${item.make} ${item.model}`}
                      className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-gradient-soft">
                      {item.make} {item.model}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {[item.year || null, item.status].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-3 text-sm text-foreground/90">{item.price_cash}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
