import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Phone, MessageCircle, Send, ArrowRight, ArrowUpRight, Check, Star,
  Search, KeyRound, Globe2, ShieldCheck, Truck, Award, Users, Clock, Crown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import heroCar from "@/assets/hero-car.jpg";
import portrait from "@/assets/portrait.jpg";
import carAudi from "@/assets/car-audi.jpg";
import carBmw from "@/assets/car-bmw.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";
import carPorsche from "@/assets/car-porsche.jpg";
import carRange from "@/assets/car-range.jpg";

/* ---------- helpers ---------- */

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
      <span className="h-px w-8 bg-primary/60" />
      {children}
    </div>
  );
}

/* ---------- navbar ---------- */

function Nav() {
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
              <a href="#contact">
                Получить консультацию <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-sm border-border bg-transparent hover:bg-secondary text-foreground hover:text-foreground text-sm tracking-wide uppercase">
              <a href="#services">Подобрать автомобиль</a>
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

function Achievements() {
  const items = [
    { icon: Clock, n: "20+", t: "Лет опыта", d: "В премиальном автомобильном бизнесе с 2003 года." },
    { icon: Users, n: "1000+", t: "Клиентов", d: "Получили свой автомобиль под ключ через мою команду." },
    { icon: Globe2, n: "Глобально", t: "Международная логистика", d: "Германия, Япония, ОАЭ, Корея, США — прямые каналы." },
    { icon: Crown, n: "Premium", t: "Сегмент", d: "Audi, BMW, Mercedes-Benz, Porsche, Bentley, Maybach." },
  ];
  return (
    <section className="py-32 bg-graphite-deep relative overflow-hidden">
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
                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                  Подробнее <ArrowRight className="w-3.5 h-3.5" />
                </div>
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
            <a href="#contact" className="text-sm uppercase tracking-[0.3em] text-primary inline-flex items-center gap-2 group">
              Заказать подобный <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((c, i) => (
            <Reveal key={c.n} delay={(i % 3) * 100}>
              <div className="group relative overflow-hidden bg-background border border-border">
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
              </div>
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
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Заявка отправлена", { description: "Я свяжусь с вами в течение часа." });
    }, 800);
  };
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
              <a href="tel:+79991234567" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                  <Phone className="w-4 h-4 text-primary" />
                </span>
                <span className="text-foreground/90 group-hover:text-foreground">+7 (999) 123-45-67</span>
              </a>
              <a href="https://t.me/" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                  <Send className="w-4 h-4 text-primary" />
                </span>
                <span className="text-foreground/90 group-hover:text-foreground">Telegram · @nikolaev_auto</span>
              </a>
              <a href="https://wa.me/" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </span>
                <span className="text-foreground/90 group-hover:text-foreground">WhatsApp · персональная линия</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <form onSubmit={onSubmit} className="bg-background border border-border p-8 lg:p-12 shadow-elegant">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Персональная заявка</div>
            <h3 className="font-display text-3xl mt-4">Свяжусь лично</h3>

            <div className="mt-10 space-y-6">
              <div>
                <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Имя</label>
                <Input
                  required name="name" placeholder="Как к вам обращаться"
                  className="mt-2 h-12 bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 text-base"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Телефон</label>
                <Input
                  required type="tel" name="phone" placeholder="+7 (___) ___-__-__"
                  className="mt-2 h-12 bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 text-base"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Комментарий</label>
                <Textarea
                  name="comment" rows={3} placeholder="Какой автомобиль интересует?"
                  className="mt-2 bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 text-base resize-none"
                />
              </div>
            </div>

            <Button
              type="submit" disabled={loading}
              className="mt-10 w-full h-14 rounded-sm bg-primary text-primary-foreground hover:bg-primary-glow text-sm uppercase tracking-wide"
            >
              {loading ? "Отправка..." : (<>Отправить заявку <ArrowRight className="ml-2 w-4 h-4" /></>)}
            </Button>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
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
            <li><a href="#gallery" className="hover:text-foreground transition-smooth">Гараж</a></li>
            <li><a href="#process" className="hover:text-foreground transition-smooth">Процесс</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Контакты</div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><a href="tel:+79162253359" className="hover:text-foreground transition-smooth">+7 (916) 225-33-59</a></li>
            <li><a href="mailto:hello@nikolaev-auto.ru" className="hover:text-foreground transition-smooth">hello@nikolaev-auto.ru</a></li>
            <li className="flex gap-4 pt-2">
              <a href="https://t.me/" aria-label="Telegram" className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center transition-smooth"><Send className="w-4 h-4" /></a>
              <a href="https://wa.me/" aria-label="WhatsApp" className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center transition-smooth"><MessageCircle className="w-4 h-4" /></a>
              <a href="tel:+79162253359" aria-label="Phone" className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center transition-smooth"><Phone className="w-4 h-4" /></a>
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
      <Achievements />
      <Services />
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
