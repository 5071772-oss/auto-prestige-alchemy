import { Link } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { useSeo } from "@/lib/seo";
import { PHONE, PHONE_FORMATTED, TELEGRAM_URL } from "@/lib/brand";

/**
 * Сопровождение сделки.
 *
 * Одна страница вместо набора карточек «услуг»: здесь видно, из чего состоит работа
 * и что защищает деньги клиента на каждом шаге. Обещаний, которых нет в услугах,
 * здесь быть не должно.
 */
export default function Support() {
  useSeo({
    title: "Как проходит сделка — договор, аккредитив, этапы оплаты | Николаев Premium auto",
    description:
      "Сопровождение сделки от задачи до ключей: подбор, проверка автомобиля, договор, расчёты через аккредитив Сбербанка, логистика, таможня, выдача.",
    path: "/support",
  });

  const steps = [
    {
      t: "Задача",
      d: "Начинаем не с машины, а с того, как вы ездите: дороги, семья, пробег, срок владения. Иногда после этого разговора выясняется, что машина, которую вы хотите, вам не подходит — тогда я скажу об этом прямо.",
    },
    {
      t: "Подборка",
      d: "Собираю два-три варианта под вашу задачу — из того, что есть в наличии, и из закрытых дилерских баз. По каждой машине пишу, почему предлагаю именно её и на что посмотреть.",
    },
    {
      t: "Проверка",
      d: "Автомобиль проверяется до сделки: история, кузов, техническое состояние. Если машина не проходит проверку — она не попадает в сделку.",
    },
    {
      t: "Договор",
      d: "Сделка оформляется официально. В договоре — автомобиль, сумма и этапы оплаты.",
    },
    {
      t: "Оплата",
      d: "Расчёты идут через аккредитив Сбербанка: деньги раскрываются продавцу только после выполнения условий сделки. Платежи — по этапам, а не одной суммой вперёд.",
    },
    {
      t: "Логистика и таможня",
      d: "Если машина едет из-за рубежа — доставка и таможенное оформление на мне. Вы видите, где машина находится, на каждом этапе.",
    },
    {
      t: "Выдача",
      d: "Передача автомобиля и документов. Помогу с постановкой на учёт.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-24">
        <section className="container">
          <SectionLabel>Сопровождение</SectionLabel>
          <h1 className="mt-6 font-display text-4xl lg:text-5xl leading-tight">
            Сделка целиком —
            <br />
            <span className="italic text-gradient">от задачи до ключей</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
            Я не продаю машины со склада: работа начинается с разговора о задаче и заканчивается ключами
            в руках. Ниже — из чего состоит эта работа и что защищает ваши деньги на каждом шаге.
          </p>
        </section>

        <section className="container mt-16 grid gap-10 md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step.t} className="border-t border-border pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-2xl text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="font-display text-2xl">{step.t}</h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
            </div>
          ))}
        </section>

        <section className="container mt-20">
          <div className="border border-border p-8 lg:p-10">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Деньги под защитой</div>
            <h2 className="mt-4 font-display text-2xl lg:text-3xl">Четыре вещи, которые это обеспечивают</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Аккредитив Сбербанка", "Продавец получает деньги только после выполнения условий сделки"],
                ["Официальный договор", "Автомобиль, сумма и сроки зафиксированы документально"],
                ["Оплата по этапам", "Никаких переводов всей суммы вперёд"],
                ["Проверка до подписания", "Машина проверяется, пока деньги ещё не ушли"],
              ].map(([title, text]) => (
                <div key={title}>
                  <div className="text-sm uppercase tracking-[0.2em]">{title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mt-20 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionLabel>Финансирование</SectionLabel>
            <h2 className="mt-4 font-display text-2xl lg:text-3xl">Лизинг и кредит</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Компаниям и предпринимателям машину можно взять в лизинг, частным клиентам — в кредит.
              Условия считает лизинговая компания или банк; я подбираю автомобиль под их требования
              и веду сделку.
            </p>
            <Link to="/leasing" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-primary transition-smooth hover:text-foreground">
              Подробнее про лизинг и кредит →
            </Link>
          </div>
          <div>
            <SectionLabel>После покупки</SectionLabel>
            <h2 className="mt-4 font-display text-2xl lg:text-3xl">Помогу и дальше</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Подскажу по страхованию, детейлингу и обслуживанию — за двадцать лет в этом бизнесе
              у меня есть проверенные контакты. Машина не заканчивается выдачей ключей: если через год
              вы решите её менять, я помогу и с этим.
            </p>
          </div>
        </section>

        <section className="container mt-20 border border-border p-8 lg:p-10">
          <h2 className="font-display text-2xl lg:text-3xl">Начнём с задачи</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Ответьте на семь вопросов о том, как вы ездите, — и я подготовлю подборку под вашу задачу.
            Это займёт две минуты и ни к чему не обязывает.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/podbor"
              className="inline-flex h-12 items-center border border-primary px-8 text-xs uppercase tracking-[0.2em] text-primary transition-smooth hover:bg-primary hover:text-primary-foreground"
            >
              Ответить на 7 вопросов
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
