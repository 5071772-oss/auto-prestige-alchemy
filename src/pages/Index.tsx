import AmoForm from "@/components/AmoForm";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

import {
  Phone, MessageCircle, Send, ArrowRight, ArrowUpRight, Check, Star,
  Search, KeyRound, Globe2, ShieldCheck, Truck, Award, Users, Clock, Crown,
  ChevronRight, Landmark, FileText, CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import heroCar from "@/assets/hero-car.jpg";
import portrait from "@/assets/portrait.jpg";
import carAudi from "@/assets/car-audi.jpg";
import carBmw from "@/assets/car-bmw.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";
import carPorsche from "@/assets/car-porsche.jpg";
import carRange from "@/assets/car-range.jpg";

/* ---------- helpers ---------- */

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
      <span className="h-px w-8 bg-primary/60" />
      {children}
    </div>
  );
}

/* ---------- navbar ---------- */

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-tight text-gradient-soft">Николаев</span>
          <span className="hidden sm:block h-4 w-px bg-border" />
          <span className="hidden sm:block text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Premium auto</span>
        </a>
        <nav className="hidden lg:flex items-center gap-10 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-smooth">Обо мне</a>
          <a href="#services" className="hover:text-foreground transition-smooth">Услуги</a>
          <Link to="/stock" className="hover:text-foreground transition-smooth font-medium text-primary">В наличии</Link>
          <a href="#gallery" className="hover:text-foreground transition-smooth">Гараж</a>
          <a href="#process" className="hover:text-foreground transition-smooth">Процесс</a>
          <a href="#contact" className="hover:text-foreground transition-smooth">Контакты</a>
        </nav>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 text-sm border border-border hover:border-primary px-5 h-11 rounded-sm transition-smooth"
        >
          Связаться
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </header>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-end overflow-hidden">
      <img
        src={heroCar}
        alt="Премиальный Mercedes-Benz S-класса в студии"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover animate-fade-in"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />

      <div className="container relative z-10 pb-24 pt-32">
        <Reveal>
          <SectionLabel>Личный эксперт · с 2003 года</SectionLabel>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display mt-8 text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl">
            <span className="text-gradient-soft">Николаев Алексей</span>
            <span className="block text-muted-foreground text-2xl sm:text-3xl lg:text-4xl font-light mt-6 max-w-3xl">
              эксперт по премиальным автомобилям —{" "}
              <span className="text-gradient-gold">Audi, BMW, Mercedes-Benz</span> и выше
            </span>
          </h1>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Более 20 лет в автомобильном бизнесе. 1000+ клиентов, получивших свой автомобиль
            под ключ — с подбором, импортом, таможней и юридическим сопровождением.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="h-14 px-8 rounded-sm bg-primary text-primary-foreground hover:bg-primary-glow transition-smooth text-sm tracking-wide uppercase">
              <Link to="/stock">
                Автомобили в наличии <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 border border-border max-w-4xl">
            {[
              ["20+", "лет в индустрии"],
              ["1000+", "довольных клиентов"],
              ["50+", "стран импорта"],
              ["100%", "сопровождение"],
            ].map(([n, l]) => (
              <div key={l} className="bg-background/80 backdrop-blur px-6 py-6">
                <div className="font-display text-3xl text-gradient-gold">{n}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/60">
        scroll
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Audi", "BMW", "Mercedes-Benz", "Porsche", "Range Rover", "Bentley", "Maserati", "Lexus", "Maybach"];
  return (
    <div className="border-y border-border bg-graphite-deep overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-6">
        {[...items, ...items, ...items].map((b, i) => (
          <span key={i} className="font-display text-2xl text-muted-foreground/50 mx-12 tracking-[0.15em]">
            {b} <span className="text-primary/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32 bg-background">
      <div className="container grid lg:grid-cols-12 gap-16 items-start">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-4 border border-border" />
            <img
              src={portrait}
              alt="Николаев Алексей — портрет в шоуруме"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative w-full aspect-[4/5] object-cover grayscale-[15%]"
            />
            <div className="absolute -bottom-6 -right-6 bg-background border border-border px-6 py-4">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">с 2003</div>
              <div className="font-display text-xl mt-1">Личный консультант</div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-8">
          <Reveal>
            <SectionLabel>Обо мне</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-8 leading-[1.05] text-gradient-soft">
              Двадцать лет рядом
              <br />с автомобилями,<br />
              <span className="italic text-gradient-gold">которые меняют жизнь.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed text-lg max-w-2xl">
              <p>
                Меня зовут Алексей Николаев. С 2003 года я занимаюсь подбором, покупкой
                и импортом автомобилей премиального сегмента — от Audi и BMW
                до Mercedes-Maybach, Porsche и Range Rover.
              </p>
              <p>
                За плечами — опыт во внешнеторговой деятельности, международной логистике,
                таможенном оформлении и сопровождении сделок любой сложности. Я знаю
                рынок изнутри: дилеров, аукционы, надёжные склады, проверенных перевозчиков.
              </p>
              <p className="text-foreground">
                Моя работа — это не продажа машин. Это персональный сервис, где каждая
                деталь под контролем, а клиент получает именно тот автомобиль, о котором мечтал.
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {[
                "Прозрачные сделки и фиксированная стоимость услуг",
                "Доступ к закрытым площадкам и дилерским каналам",
                "Юридическая и таможенная чистота на каждом этапе",
                "Полное сопровождение — от выбора до постановки на учёт",
              ].map((t) => (
                <div key={t} className="flex gap-3 items-start border border-border p-5 bg-gradient-card">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90">{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HonestApproach() {
  const steps = [
    {
      n: "01",
      t: "Квиз из 7 вопросов",
      d: "Перед созвоном вы отвечаете на несколько ключевых вопросов. Это помогает мне понять вашу задачу ещё до разговора.",
    },
    {
      n: "02",
      t: "Персональная подборка",
      d: "Я готовлю для вас PDF с реальными привезёнными автомобилями — под ваш запрос, а не «что есть в наличии».",
    },
    {
      n: "03",
      t: "Видеовстреча",
      d: "Мы созваниваемся там, где вам удобно — Zoom, МТС Линк, Telegram, MAX. Разбираем: почему именно эта машина, для каких задач, где будете ездить, семья, стиль вождения.",
    },
  ];

  const stories = [
    {
      t: "Хотел дизель — уехал на бензине",
      d: "Клиент пришёл за дизельным X5. Но по разговору я понял: он любит резкий разгон и звук мотора. На дизеле он бы не получил кайфа. Мы прокатились на тестовой машине — и он сам выбрал бензин. Сегодня он ездит именно на той машине, что дарит ему эмоции.",
    },
    {
      t: "Красивая машина — но не для этой дороги",
      d: "Клиент мечтал о Passat CC — стремительный силуэт, низкий клиренс, 19-е колёса. Но он переехал за город, где километр разбитой дороги. Зимой он бы просто не доехал до дома. Я предложил другой автомобиль — и он остался благодарен. Красота должна работать в реальной жизни.",
    },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <SectionLabel>Честный подход</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-8 leading-[1.05] text-gradient-soft">
              Иногда моя задача — отговорить вас от машины,
              <br />
              <span className="italic text-gradient-gold">которую вы хотите.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto">
              <p>
                Я не продаю автомобили. Я помогаю принять правильное решение. И если машина мечты не подходит под вашу реальную жизнь — я скажу об этом прямо. Даже если это невыгодно мне.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <div className="mt-20 text-center">
            <h3 className="font-display text-2xl sm:text-3xl text-gradient-soft">Как проходит консультация</h3>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={300 + i * 100}>
              <div className="p-8 border border-border bg-gradient-card h-full">
                <div className="font-display text-4xl text-gradient-gold">{s.n}</div>
                <h4 className="font-display text-xl mt-6 text-foreground">{s.t}</h4>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="mt-24 text-center">
            <h3 className="font-display text-2xl sm:text-3xl text-gradient-soft">Реальные истории</h3>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {stories.map((s, i) => (
            <Reveal key={s.t} delay={600 + i * 100}>
              <div className="p-8 lg:p-10 border border-border bg-gradient-card h-full">
                <h4 className="font-display text-xl lg:text-2xl text-gradient-gold">«{s.t}»</h4>
                <p className="mt-5 text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={800}>
          <p className="mt-20 text-center font-display italic text-xl sm:text-2xl text-gradient-gold max-w-3xl mx-auto leading-relaxed">
            Машина должна подходить не только вашему вкусу — но и вашим дорогам, задачам и характеру. Моя репутация дороже одной сделки.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    {
      icon: Landmark,
      t: "Аккредитив Сбербанка",
      d: "Ваши средства хранятся в банке и раскрываются продавцу поэтапно — только после выполнения условий сделки. Никаких переводов «в никуда».",
    },
    {
      icon: FileText,
      t: "Официальный договор",
      d: "Работаю только по договору, где зафиксировано всё: стоимость, сроки, ответственность сторон. Моя комиссия включена в договор и не меняется — никаких доплат «по ходу».",
    },
    {
      icon: CreditCard,
      t: "Поэтапная оплата",
      d: "Предоплата по договору → подбор автомобиля → инвойс → покупка → доставка до границы → таможенное оформление → доставка вам. Вы платите по прозрачной схеме и видите движение сделки.",
    },
    {
      icon: Search,
      t: "Проверка перед покупкой",
      d: "Мой человек на месте проверяет автомобиль вживую: детальные фото, видео, полный отчёт. Как инженер-механик я лично оцениваю состояние и честно говорю — стоит брать эту машину или нет.",
    },
  ];
  return (
    <section className="py-32 bg-graphite-deep relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Безопасность сделки</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-8 leading-[1.05] text-gradient-soft">
              Ваши деньги под защитой
              <span className="italic text-gradient-gold"> на каждом этапе</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Покупка автомобиля за рубежом — это доверие на миллионы. Я выстроил процесс так,
              чтобы вы контролировали каждый рубль и видели каждый шаг.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 100}>
              <div className="p-8 border border-border bg-background h-full hover:border-primary/40 transition-smooth group">
                <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                  <it.icon className="w-6 h-6 text-primary" strokeWidth={1.2} />
                </div>
                <h3 className="font-display text-xl mt-8">{it.t}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <p className="mt-16 text-center font-display italic text-xl sm:text-2xl text-foreground/90 max-w-4xl mx-auto leading-relaxed">
            Я зарабатываю на прозрачности, а не на скрытых наценках. Поэтому вы всегда знаете, за что платите.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Achievements() {
  const items = [
    { icon: Clock, n: "20+", t: "Лет опыта", d: "В премиальном автомобильном бизнесе с 2003 года." },
    { icon: Users, n: "1000+", t: "Клиентов", d: "Получили свой автомобиль под ключ через мою команду." },
    { icon: Globe2, n: "Глобально", t: "Международная логистика", d: "Германия, Япония, ОАЭ, Корея, США — прямые каналы." },
    { icon: Crown, n: "Premium", t: "Сегмент", d: "Audi, BMW, Mercedes-Benz, Porsche, Bentley, Maybach." },
  ];
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container">
        <Reveal>
          <SectionLabel>Цифры</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl mt-6 max-w-2xl text-gradient-soft">
            Опыт, который измеряется
            <span className="italic text-gradient-gold"> результатом.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 100}>
              <div className="bg-background p-10 h-full group hover:bg-graphite transition-smooth">
                <it.icon className="w-7 h-7 text-primary" strokeWidth={1.2} />
                <div className="font-display text-5xl text-gradient-gold mt-8">{it.n}</div>
                <div className="mt-3 text-base text-foreground">{it.t}</div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: Search, t: "Подбор автомобиля", d: "Анализ рынка, поиск идеального экземпляра по вашим требованиям, бюджету и ожиданиям. Без компромиссов." },
    { icon: KeyRound, t: "Покупка под ключ", d: "Беру на себя весь процесс: переговоры, проверку, оплату, оформление документов. Вы получаете готовый автомобиль." },
    { icon: Globe2, t: "Импорт автомобилей", d: "Прямые поставки из Германии, Японии, ОАЭ, Кореи и США. Только проверенные источники и прозрачная история." },
    { icon: ShieldCheck, t: "Проверка и сопровождение", d: "Технический и юридический аудит, проверка истории, диагностика, полное сопровождение сделки." },
    { icon: Truck, t: "Логистика и таможня", d: "Международная логистика, экспедирование, страхование, таможенное оформление под ключ." },
    { icon: Award, t: "VIP-консьерж", d: "Личное сопровождение, конфиденциальность, постановка на учёт, передача автомобиля в удобной локации." },
  ];
  return (
    <section id="services" className="py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel>Услуги</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-8 leading-[1.05] text-gradient-soft">
              Полный цикл —<br />
              <span className="italic text-gradient-gold">от мечты до ключей.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={150}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Каждая услуга — это отдельный продуманный процесс с фиксированной
              ответственностью и прозрачной отчётностью на каждом этапе.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <div className="bg-background p-10 h-full group relative overflow-hidden hover:bg-graphite transition-smooth">
                <div className="absolute top-8 right-8 font-display text-xs text-muted-foreground/50 tracking-widest">
                  0{i + 1}
                </div>
                <s.icon className="w-9 h-9 text-primary" strokeWidth={1.2} />
                <h3 className="font-display text-2xl mt-8">{s.t}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const cars = [
    { img: carMercedes, brand: "Mercedes-Benz", model: "G63 AMG", spec: "2024 · Германия", n: "01" },
    { img: carAudi, brand: "Audi", model: "RS7 Performance", spec: "2024 · Германия", n: "02" },
    { img: carBmw, brand: "BMW", model: "M8 Competition", spec: "2024 · Германия", n: "03" },
    { img: carPorsche, brand: "Porsche", model: "911 Turbo S", spec: "2024 · Германия", n: "04" },
    { img: carRange, brand: "Range Rover", model: "Autobiography", spec: "2024 · Великобритания", n: "05" },
    { img: heroCar, brand: "Mercedes-Maybach", model: "S 680", spec: "2024 · ОАЭ", n: "06" },
  ];
  return (
    <section id="gallery" className="py-32 bg-graphite-deep">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionLabel>Гараж клиентов</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-8 max-w-3xl text-gradient-soft">
              Автомобили, которые<br />я привёз{" "}
              <span className="italic text-gradient-gold">своим клиентам.</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <Link to="/stock" className="text-sm uppercase tracking-[0.3em] text-primary inline-flex items-center gap-2 group">
              Смотреть все в наличии <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((c, i) => (
            <Reveal key={c.n} delay={(i % 3) * 100}>
              <Link to="/stock" className="group relative overflow-hidden bg-background border border-border block">
                <div className="aspect-[4/3] overflow-hidden bg-graphite">
                  <img
                    src={c.img}
                    alt={`${c.brand} ${c.model}`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex items-start justify-between gap-4 border-t border-border">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{c.brand}</div>
                    <div className="font-display text-2xl mt-2">{c.model}</div>
                    <div className="text-sm text-muted-foreground mt-2">{c.spec}</div>
                  </div>
                  <div className="font-display text-xs text-primary/70 tracking-widest">{c.n}</div>
                </div>
              </Link>

            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  const items = [
    { t: "Личный подход", d: "Я работаю с каждым клиентом лично — от первой консультации до передачи ключей." },
    { t: "Конфиденциальность", d: "Все детали сделки остаются между нами. Полная анонимность и защита данных." },
    { t: "Прозрачность", d: "Фиксированная стоимость услуг, отчётность по каждому платежу, открытая логистика." },
    { t: "Сеть контактов", d: "Прямые контакты с дилерами, аукционами и проверенными площадками по всему миру." },
    { t: "Юридическая чистота", d: "Полная проверка автомобиля, документов и истории — никаких сюрпризов." },
    { t: "Скорость", d: "Отлаженные процессы позволяют закрывать сделки в кратчайшие сроки." },
  ];
  return (
    <section className="py-32 bg-background">
      <div className="container">
        <Reveal>
          <SectionLabel>Почему я</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-8 max-w-3xl text-gradient-soft">
            Шесть причин<br />
            <span className="italic text-gradient-gold">доверить мне выбор.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={(i % 3) * 100}>
              <div className="p-8 border border-border bg-gradient-card h-full hover:border-primary/40 transition-smooth">
                <div className="font-display text-5xl text-primary/30">0{i + 1}</div>
                <h3 className="font-display text-2xl mt-6">{it.t}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { n: "Сергей М.", r: "Владелец IT-компании", t: "Mercedes-Maybach S 680", q: "Алексей привёз автомобиль точно в срок и в идеальном состоянии. Я даже не вмешивался в процесс — всё было под контролем. Уровень сервиса исключительный." },
    { n: "Елена К.", r: "Совладелица сети ресторанов", t: "Range Rover Autobiography", q: "Доверилась рекомендации друзей — и не пожалела. Прозрачная сделка, никаких неожиданностей, идеальная машина по идеальной цене." },
    { n: "Дмитрий В.", r: "Управляющий партнёр", t: "Porsche 911 Turbo S", q: "Уже третий автомобиль через Алексея. Это не услуга — это партнёрство. Знает рынок, людей и понимает мои предпочтения с полуслова." },
  ];
  return (
    <section className="py-32 bg-graphite-deep">
      <div className="container">
        <Reveal>
          <SectionLabel>Отзывы</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-8 max-w-3xl text-gradient-soft">
            Слова тех, кто уже<br />
            <span className="italic text-gradient-gold">за рулём.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 120}>
              <div className="p-10 border border-border bg-background h-full flex flex-col">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="mt-8 text-lg leading-relaxed text-foreground/90 font-display italic">
                  «{it.q}»
                </p>
                <div className="mt-10 pt-6 border-t border-border">
                  <div className="text-foreground">{it.n}</div>
                  <div className="text-sm text-muted-foreground mt-1">{it.r}</div>
                  <div className="text-xs uppercase tracking-[0.3em] text-primary mt-3">{it.t}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { t: "Заявка и брифинг", d: "Обсуждаем модель, комплектацию, бюджет, сроки и ваши ожидания." },
    { t: "Поиск и предложение", d: "Подбираю лучшие варианты на рынке и закрытых площадках, согласовываем шорт-лист." },
    { t: "Проверка и сделка", d: "Полная техническая и юридическая проверка, бронирование, оплата." },
    { t: "Логистика и таможня", d: "Международная доставка, экспедирование, таможенное оформление под ключ." },
    { t: "Передача ключей", d: "Подготовка, постановка на учёт и торжественная передача автомобиля." },
  ];
  return (
    <section id="process" className="py-32 bg-background relative">
      <div className="container">
        <Reveal>
          <SectionLabel>Процесс</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-8 max-w-3xl text-gradient-soft">
            Пять шагов до<br />
            <span className="italic text-gradient-gold">вашего автомобиля.</span>
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-border md:hidden" />
          <div className="grid md:grid-cols-5 gap-px bg-border border border-border">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 100}>
                <div className="bg-background p-8 h-full relative group hover:bg-graphite transition-smooth">
                  <div className="font-display text-7xl text-primary/15 leading-none">0{i + 1}</div>
                  <h3 className="font-display text-xl mt-6">{s.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  {i < steps.length - 1 && (
                    <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary bg-background" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-graphite-deep">
      <div className="absolute inset-0 opacity-30">
        <img src={heroCar} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <SectionLabel>Заявка</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-8 leading-[1] text-gradient-soft">
              Готовы найти<br />свой
              <span className="italic text-gradient-gold"> автомобиль?</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Оставьте заявку — я свяжусь лично в течение часа,
              чтобы обсудить ваши пожелания и предложить лучшие варианты на рынке.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 space-y-4 text-sm">
              <a href="tel:+79778468567" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                  <Phone className="w-4 h-4 text-primary" />
                </span>
                <span className="text-foreground/90 group-hover:text-foreground">+7 (977) 846-85-67</span>
              </a>
              <a href="https://t.me/nixon_motors" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                  <Send className="w-4 h-4 text-primary" />
                </span>
                <span className="text-foreground/90 group-hover:text-foreground">Telegram · @nixon_motors</span>
              </a>
              <a href="https://max.ru/u/f9LHodD0cOIVAsyAUIkF0DqVhojFVLR45PrJo6LSR3t2ytElHfdljYBKjM0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </span>
                <span className="text-foreground/90 group-hover:text-foreground">Max · +79778468567</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <AmoForm />
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container grid md:grid-cols-3 gap-12">
        <div>
          <div className="font-display text-2xl text-gradient-soft">Николаев Алексей</div>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">
            Личный эксперт по премиальным автомобилям. Подбор, импорт и сопровождение
            сделок с 2003 года.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Навигация</div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><a href="#about" className="hover:text-foreground transition-smooth">Обо мне</a></li>
            <li><a href="#services" className="hover:text-foreground transition-smooth">Услуги</a></li>
            <li><Link to="/stock" className="hover:text-foreground transition-smooth">В наличии</Link></li>
            <li><a href="#gallery" className="hover:text-foreground transition-smooth">Гараж</a></li>
            <li><a href="#process" className="hover:text-foreground transition-smooth">Процесс</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Контакты</div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><a href="tel:+79778468567" className="hover:text-foreground transition-smooth">+7 (977) 846-85-67</a></li>
            <li><a href="mailto:hello@nikolaev-auto.ru" className="hover:text-foreground transition-smooth">hello@nikolaev-auto.ru</a></li>
            <li className="flex gap-4 pt-2">
              <a href="https://t.me/" aria-label="Telegram" className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center transition-smooth"><Send className="w-4 h-4" /></a>
              <a href="https://max.ru/u/f9LHodD0cOIVAsyAUIkF0DqVhojFVLR45PrJo6LSR3t2ytElHfdljYBKjM0" target="_blank" rel="noopener noreferrer" aria-label="Max" className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center transition-smooth"><MessageCircle className="w-4 h-4" /></a>
              <a href="tel:+79778468567" aria-label="Phone" className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center transition-smooth"><Phone className="w-4 h-4" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t border-border flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Николаев Алексей. Все права защищены.</div>
        <div className="uppercase tracking-[0.3em]">Premium automotive consulting</div>
      </div>
    </footer>
  );
}

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main>
      <Hero />
      <Marquee />
      <About />
      <HonestApproach />
      <Achievements />
      <Services />
      <Security />
      <Gallery />
      <Advantages />
      <Testimonials />
      <Process />
      <CTA />
    </main>
    <Footer />
  </div>
);

export default Index;
