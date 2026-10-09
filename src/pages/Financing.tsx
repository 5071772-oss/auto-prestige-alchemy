import { Link } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { useSeo } from "@/lib/seo";
import { PHONE, PHONE_FORMATTED, TELEGRAM_URL } from "@/lib/brand";

/**
 * Лизинг и кредит.
 *
 * Отдельная страница, потому что для части клиентов вопрос «как финансировать»
 * стоит раньше вопроса «какую машину». Здесь честно разделено: что делает эксперт,
 * а что решает лизинговая компания или банк.
 */
export default function Financing() {
  useSeo({
    title: "Лизинг и кредит на премиальный автомобиль — подбор и сопровождение | Николаев Premium auto",
    description:
      "Лизинг для компаний и ИП, кредит для частных клиентов: подбираю автомобиль под задачу и веду сделку. Условия считает лизинговая компания или банк.",
    path: "/leasing",
  });

  const steps = [
    { t: "Задача и статус", d: "Компания вы, ИП или частное лицо, на какой срок берёте машину и что для вас важнее — платёж или остаточная стоимость." },
    { t: "Подбор автомобиля", d: "Машину подбираю я: ту, которую компания готова взять в сделку, а не ту, что просто есть на складе." },
    { t: "Расчёт и решение", d: "Платёж, аванс и срок считает лизинговая компания или банк. Я помогаю собрать документы по автомобилю и веду переписку." },
    { t: "Сделка и выдача", d: "Договор, оплата по этапам, логистика, таможня, постановка на учёт — как и при обычной покупке." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-24">
        <section className="container">
          <SectionLabel>Финансирование</SectionLabel>
          <h1 className="mt-6 font-display text-4xl lg:text-5xl leading-tight">
            Машину не обязательно
            <br />
            <span className="italic text-gradient">покупать за свои</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
            Для компаний и предпринимателей — лизинг, для частных клиентов — кредит. В обоих случаях
            автомобиль подбираю я, а платёж считает финансовая организация: это её работа, и условия
            она определяет сама.
          </p>
        </section>

        <section className="container mt-16 grid gap-8 lg:grid-cols-2">
          <div className="border border-border p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Лизинг</div>
            <h2 className="mt-4 font-display text-2xl">Компаниям и предпринимателям</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Автомобиль остаётся на балансе лизинговой компании, вы платите за пользование — платежами,
              а не всей суммой сразу. Договор лизинга и закрывающие документы идут в расходы компании.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Работаю с лизинговыми компаниями, которые возят те марки, что есть в каталоге. Если у вашей
              компании уже есть лизинговая компания — подберу машину под её требования.
            </p>
          </div>
          <div className="border border-border p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Кредит</div>
            <h2 className="mt-4 font-display text-2xl">Частным клиентам</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Банк оплачивает автомобиль, вы возвращаете сумму частями. Машина при этом в залоге,
              поэтому банк смотрит и на неё тоже: возраст, состояние, история.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Моя часть — подобрать автомобиль, который банк примет в залог без вопросов, и провести
              сделку так, чтобы деньги не ушли раньше машины.
            </p>
          </div>
        </section>

        <section className="container mt-20">
          <SectionLabel>Как это проходит</SectionLabel>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.t} className="border-t border-border pt-6">
                <div className="font-display text-2xl text-primary">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-3 text-sm uppercase tracking-[0.2em]">{step.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mt-20">
          <div className="border border-border p-8 lg:p-10">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Честно</div>
            <h2 className="mt-4 font-display text-2xl lg:text-3xl">Чего я не обещаю</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="text-foreground">Ставку, срок одобрения и решение.</span> Это определяет
                  лизинговая компания или банк — у них свои условия и свои требования к заёмщику.
                  Обещать конкретную цифру до их ответа было бы обманом.
                </p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="text-foreground">Что я делаю.</span> Подбираю автомобиль под задачу,
                  проверяю его до сделки, готовлю документы по машине и веду сделку целиком: договор,
                  аккредитив, оплата по этапам, логистика, таможня, выдача.
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Скажите, на кого оформляете и на какой срок — подскажу, какие документы понадобятся
              и к какой компании в вашем случае имеет смысл обратиться.
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
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
