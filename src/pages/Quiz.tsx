import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { useSeo } from "@/lib/seo";
import { submitLead, utmFromLocation } from "@/lib/chatium-leads";
import { GOALS, reachGoal } from "@/lib/analytics";
import { TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/brand";

/**
 * Квиз из 7 вопросов — первый шаг работы, обещанный на главной странице.
 *
 * Вопросы не про машину, а про жизнь: где и сколько человек ездит, с кем, как водит,
 * на сколько лет берёт. Только после этого имеет смысл говорить о марке и комплектации.
 * Ответы уходят в заявку целиком, чтобы эксперт видел их до звонка.
 *
 * Название формы уходит в кабинет заявок: по нему в заявке видно, что человек пришёл из квиза.
 */

const FORM_NAME = "Квиз: 7 вопросов";

interface Question {
  id: string;
  title: string;
  hint?: string;
  options?: string[];
  /** Вопрос со свободным ответом вместо вариантов. */
  free?: boolean;
  /** Свободный вопрос, на который можно не отвечать. */
  optional?: boolean;
}

const QUESTIONS: Question[] = [
  {
    id: "roads",
    title: "Где и сколько вы ездите?",
    hint: "От этого зависит привод, клиренс и подвеска.",
    options: ["В основном город", "Каждый день по трассе", "За городом, дороги разные", "И город, и трасса примерно поровну"],
  },
  {
    id: "passengers",
    title: "С кем вы обычно ездите?",
    options: ["Один или одна", "Вдвоём", "С детьми", "С пассажирами сзади и с багажом"],
  },
  {
    id: "driving",
    title: "Как вы водите?",
    hint: "Это вопрос комплектации, а не характера.",
    options: ["Спокойно и размеренно", "Люблю разгон и звук мотора", "По-разному, зависит от дороги"],
  },
  {
    id: "ownership",
    title: "Сколько планируете владеть машиной?",
    hint: "Три года и десять лет — это разные автомобили.",
    options: ["Год-два", "Три-пять лет", "Больше пяти лет", "Пока не надоест"],
  },
  {
    id: "current",
    title: "На чём ездите сейчас и что в этом нравится?",
    hint: "К чему вы привыкли и от чего готовы отказаться.",
    free: true,
    optional: true,
  },
  {
    id: "budget",
    title: "Какой бюджет рассматриваете целиком?",
    hint: "Считаем всё вместе: автомобиль, доставку, оформление — не только цену машины.",
    options: ["До 10 млн ₽", "10–17 млн ₽", "17–25 млн ₽", "Больше 25 млн ₽", "Пока не определил"],
  },
  {
    id: "timing",
    title: "Что важнее: получить машину сейчас или найти точно ту?",
    options: ["Нужна машина сейчас", "Могу подождать поставку", "Ищу конкретную комплектацию и готов ждать"],
  },
];

type Errors = Partial<Record<"name" | "phone", string>>;

export default function Quiz() {
  useSeo({
    title: "Квиз из 7 вопросов — подбор автомобиля под вашу задачу | Николаев Premium auto",
    description:
      "Семь вопросов о том, как вы ездите, с кем и на сколько лет. Ответьте — и я подберу премиальный автомобиль под вашу задачу, а не под каталог.",
    path: "/podbor",
  });

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const total = QUESTIONS.length;
  const contactStep = step === total;
  const question = step < total ? QUESTIONS[step] : null;

  const summary = QUESTIONS.map(
    (item, index) => `${index + 1}. ${item.title} — ${answers[item.id]?.trim() || "не ответил"}`,
  ).join("\n");

  const choose = (value: string) => {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: value }));
    setStep((current) => current + 1);
  };

  const submitFree = () => {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: draft.trim() }));
    setDraft("");
    setStep((current) => current + 1);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Укажите корректный телефон";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (!consent) {
      toast.error("Для отправки нужно согласие на обработку персональных данных.");
      return;
    }

    setSending(true);
    const result = await submitLead({
      name: name.trim(),
      phone: phone.trim(),
      message: `Ответы из квиза:\n${summary}`,
      pageUrl: window.location.href,
      referrer: document.referrer || undefined,
      formName: FORM_NAME,
      ...utmFromLocation(),
    });
    setSending(false);

    if (!result.ok) {
      toast.error("Не удалось отправить ответы. Попробуйте ещё раз или напишите в Telegram.");
      return;
    }

    reachGoal(GOALS.formSent);
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-24">
        <section className="container max-w-3xl">
          <SectionLabel>Подбор под задачу</SectionLabel>
          <h1 className="mt-6 font-display text-4xl lg:text-5xl leading-tight">
            Семь вопросов — и я знаю,
            <br />
            <span className="italic text-gradient">какую машину вам искать</span>
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
            Ответьте на семь вопросов о том, как вы живёте и ездите. Это займёт две минуты, и до разговора
            о марках и цветах я буду понимать вашу задачу. Иногда после этих вопросов выясняется, что машина,
            которую вы хотите, вам не подходит — тогда я скажу об этом прямо.
          </p>

          <div className="mt-12 bg-background border border-border p-6 lg:p-10 shadow-elegant">
            {done ? (
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-primary">Ответы у меня</div>
                <h2 className="mt-4 font-display text-3xl text-gradient-soft">Спасибо, теперь вижу задачу</h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Подготовлю подборку автомобилей под ваши ответы — из тех, что уже привезены и что можно
                  найти в закрытых дилерских базах. Свяжусь с вами в течение часа.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Если удобнее написать самому — {TELEGRAM_HANDLE} в Telegram, отвечаю лично.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild className="h-12 rounded-none px-8 tracking-[0.2em] uppercase text-xs">
                    <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                      Написать в Telegram
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-none px-8 tracking-[0.2em] uppercase text-xs"
                  >
                    <Link to="/catalog">Смотреть автомобили</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span className="whitespace-nowrap">
                    {contactStep ? "Последний шаг" : `Вопрос ${step + 1} из ${total}`}
                  </span>
                  <span className="hidden sm:inline text-primary">Николаев | Premium auto</span>
                </div>
                <div className="mt-4 h-px w-full bg-border">
                  <div
                    className="h-px bg-primary transition-smooth"
                    style={{ width: `${((contactStep ? total : step) / total) * 100}%` }}
                  />
                </div>

                {question && (
                  <div className="mt-10">
                    <h2 className="font-display text-2xl lg:text-3xl leading-snug">{question.title}</h2>
                    {question.hint && <p className="mt-3 text-sm text-muted-foreground">{question.hint}</p>}

                    {question.free ? (
                      <div className="mt-8 space-y-5">
                        <Textarea
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          rows={4}
                          placeholder="Например: BMW 5 серии, устраивает управление, но тесно сзади"
                          className="rounded-none bg-card border-border resize-none"
                        />
                        <Button
                          type="button"
                          onClick={submitFree}
                          className="h-12 w-full rounded-none tracking-[0.2em] uppercase text-xs"
                        >
                          Дальше
                        </Button>
                        {question.optional && (
                          <button
                            type="button"
                            onClick={() => {
                              setDraft("");
                              setStep((current) => current + 1);
                            }}
                            className="w-full text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-smooth"
                          >
                            Пропустить вопрос
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="mt-8 space-y-3">
                        {question.options?.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => choose(option)}
                            className="w-full border border-border bg-card px-5 py-4 text-left text-sm hover:border-primary hover:text-primary transition-smooth"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {contactStep && (
                  <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
                    <h2 className="font-display text-2xl lg:text-3xl leading-snug">
                      Куда прислать подборку?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Имя и телефон — и я вернусь с вариантами под ваши ответы.
                    </p>

                    <div className="space-y-2">
                      <label htmlFor="quiz-name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Имя
                      </label>
                      <Input
                        id="quiz-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Как к вам обращаться"
                        className="h-12 rounded-none bg-card border-border"
                      />
                      {errors.name && (
                        <p role="alert" className="text-xs text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="quiz-phone" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Телефон
                      </label>
                      <Input
                        id="quiz-phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="h-12 rounded-none bg-card border-border"
                      />
                      {errors.phone && (
                        <p role="alert" className="text-xs text-destructive">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="quiz-consent"
                        checked={consent}
                        onCheckedChange={(checked) => setConsent(checked === true)}
                        aria-describedby="quiz-consent-description"
                      />
                      <label
                        id="quiz-consent-description"
                        htmlFor="quiz-consent"
                        className="text-xs text-muted-foreground leading-relaxed"
                      >
                        Я даю согласие на обработку моих персональных данных на условиях{" "}
                        <a
                          href="/personal-data-consent"
                          target="_blank"
                          rel="noreferrer"
                          className="underline underline-offset-2 hover:text-primary transition-smooth"
                        >
                          Согласия на обработку персональных данных
                        </a>
                        .
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={sending}
                      className="h-12 w-full rounded-none tracking-[0.2em] uppercase text-xs"
                    >
                      {sending ? "Отправляю…" : "Отправить ответы"}
                    </Button>
                  </form>
                )}

                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((current) => Math.max(0, current - 1))}
                    className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-smooth"
                  >
                    ← Назад
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              { n: "01", t: "Подборка", d: "Готовлю варианты под ваши ответы — из привезённых и из закрытых дилерских баз." },
              { n: "02", t: "Разговор", d: "Обсуждаем, почему эта машина подходит под ваши дороги, семью и срок владения." },
              { n: "03", t: "Сделка", d: "Договор, аккредитив, оплата по этапам, проверка автомобиля до подписания." },
            ].map((item) => (
              <div key={item.n} className="border-t border-border pt-6">
                <div className="font-display text-2xl text-primary">{item.n}</div>
                <div className="mt-3 text-sm uppercase tracking-[0.2em]">{item.t}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
