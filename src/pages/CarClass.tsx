import { Link } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { CarCard } from "@/components/stock/StockPage";
import { useCatalog } from "@/lib/chatium-catalog";
import { useSeo } from "@/lib/seo";
import { CAR_CLASSES, type CarClass, type CarClassId } from "@/data/car-classes";
import { PHONE, PHONE_FORMATTED, TELEGRAM_URL } from "@/lib/brand";

/**
 * Страница класса: премиум, лакшери или эксклюзив.
 *
 * Отдельные адреса нужны для двух вещей: на них ведут объявления и реклама
 * («все премиальные — сюда»), и по ним человек попадает сразу в свой сегмент,
 * а не в общий каталог. Список машин собирается из того же каталога, что и везде.
 */
export default function CarClassPage({ classId }: { classId: CarClassId }) {
  const carClass = CAR_CLASSES.find((item) => item.id === classId) as CarClass;
  const { cars, loading } = useCatalog();
  const inClass = cars.filter((car) => car.carClass === classId);
  const others = CAR_CLASSES.filter((item) => item.id !== classId);

  useSeo({
    title: `${carClass.label} автомобили — подбор и покупка под ключ | Николаев Premium auto`,
    description: `${carClass.hint}. ${carClass.intro.slice(0, 120)}`,
    path: carClass.path,
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-24">
        <section className="container">
          <SectionLabel>Класс автомобилей</SectionLabel>
          <h1 className="mt-6 font-display text-4xl lg:text-5xl leading-tight">
            {carClass.heading[0]}
            <br />
            <span className="italic text-gradient">{carClass.heading[1]}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">{carClass.intro}</p>

          <div className="mt-12 grid gap-6 border-t border-border pt-8 md:grid-cols-3">
            {carClass.points.map((point, index) => (
              <div key={point}>
                <div className="font-display text-2xl text-primary">{String(index + 1).padStart(2, "0")}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>В этом классе</SectionLabel>
              <h2 className="mt-4 font-display text-3xl">
                {loading ? "Смотрю каталог…" : inClass.length ? `Сейчас ${inClass.length} ${plural(inClass.length)}` : "Свободных машин нет"}
              </h2>
            </div>
            <Link to="/catalog" className="text-xs uppercase tracking-[0.2em] text-primary transition-smooth hover:text-foreground">
              Весь каталог →
            </Link>
          </div>

          {inClass.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {inClass.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <p className="mt-8 max-w-2xl text-muted-foreground leading-relaxed">
              Сейчас в этом классе нет машин в наличии — но это не значит, что их не найти. Скажите задачу,
              и я подберу варианты из закрытых дилерских баз: с проверкой, договором и поставкой под ключ.
            </p>
          )}

          <div className="mt-16 border border-border p-8 lg:p-10">
            <h2 className="font-display text-2xl lg:text-3xl">Не нашли подходящую — скажите, какую искать</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Ответьте на семь вопросов о том, как вы ездите, — и я подготовлю подборку под вашу задачу.
              Если машина, которую вы хотите, вам не подходит, скажу об этом прямо.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/podbor"
                className="inline-flex h-12 items-center border border-primary px-8 text-xs uppercase tracking-[0.2em] text-primary transition-smooth hover:bg-primary hover:text-primary-foreground"
              >
                Подобрать под мою задачу
              </Link>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex h-12 items-center border border-border px-8 text-xs uppercase tracking-[0.2em] transition-smooth hover:border-primary"
              >
                {PHONE_FORMATTED}
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center border border-border px-8 text-xs uppercase tracking-[0.2em] transition-smooth hover:border-primary"
              >
                Написать в Telegram
              </a>
            </div>
          </div>

          <div className="mt-16 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
            {others.map((item) => (
              <Link key={item.id} to={item.path} className="group block border border-border p-6 transition-smooth hover:border-primary">
                <div className="text-xs uppercase tracking-[0.3em] text-primary">{item.hint}</div>
                <div className="mt-3 font-display text-2xl transition-smooth group-hover:text-primary">{item.label}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/** «1 машина», «2 машины», «5 машин». */
function plural(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "машина";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "машины";
  return "машин";
}
