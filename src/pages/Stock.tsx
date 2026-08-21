import AmoForm from "@/components/AmoForm";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { 
  ArrowRight, ArrowUpRight, Phone, Send, ShieldCheck, Crown, Gauge, Fuel, Zap, Palette, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Car {
  make: string;
  model: string;
  year: string;
  price: number;
  mileage: string;
  engine: string;
  power: string;
  color: string;
  status: string;
  description: string;
  images: string[];
}

const STOCK_DATA: Car[] = [
  {
    make: "BMW",
    model: "BMW Х7 40D",
    year: "2025",
    price: 16200000,
    mileage: "0",
    engine: "Дизель",
    power: "340",
    color: "Черный сапфир/ Черный салон",
    status: "В наличии",
    description: "Новый автомобиль, комплектация по запросу.",
    images: [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-27.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-28.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-29.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-32.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-33.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/auto-prestige-alchemy/photo_2026-08-20_23-04-34.webp"
    ]
  }
];

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
        <a href="/" className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-tight text-gradient-soft">Николаев</span>
          <span className="hidden sm:block h-4 w-px bg-border" />
          <span className="hidden sm:block text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Premium auto</span>
        </a>
        <nav className="hidden lg:flex items-center gap-10 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-smooth">Главная</a>
          <a href="/stock" className="text-foreground transition-smooth">В наличии</a>
          <a href="/#services" className="hover:text-foreground transition-smooth">Услуги</a>
          <a href="/#contact" className="hover:text-foreground transition-smooth">Контакты</a>
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

function CarCard({ car }: { car: Car }) {
  const [activeImage, setActiveImage] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="group bg-graphite-deep border border-border hover:border-primary/40 transition-smooth overflow-hidden flex flex-col h-full">
      {/* Image Gallery */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={car.images[activeImage]} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {car.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full">
            {car.images.slice(0, 6).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveImage(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-smooth ${idx === activeImage ? 'bg-primary w-4' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-medium rounded-sm">
            {car.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1">{car.make}</div>
            <h3 className="font-display text-2xl text-gradient-soft">{car.model}</h3>
          </div>
          <div className="text-right">
            <div className="text-xl font-medium text-gradient-gold">{formatPrice(car.price)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 text-sm border-y border-border/40 py-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary/60" />
            <span>{car.year} г.</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Gauge className="w-4 h-4 text-primary/60" />
            <span>{car.mileage} км</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Fuel className="w-4 h-4 text-primary/60" />
            <span>{car.engine}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Zap className="w-4 h-4 text-primary/60" />
            <span>{car.power} л.с.</span>
          </div>
          <div className="col-span-2 flex items-center gap-3 text-muted-foreground">
            <Palette className="w-4 h-4 text-primary/60" />
            <span className="truncate">{car.color}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
          {car.description}
        </p>

        <Button asChild className="w-full h-12 rounded-sm bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 transition-smooth text-xs tracking-widest uppercase">
          <a href="#contact">Забронировать</a>
        </Button>
      </div>
    </div>
  );
}

export default function Stock() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container relative z-10">
          <Reveal>
            <SectionLabel>Автомобили в наличии</SectionLabel>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display mt-8 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl text-gradient-soft">
              Премиальный парк,
              <br />
              <span className="italic text-gradient-gold">готовый к выдаче.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Все представленные автомобили прошли комплексную техническую проверку, 
              юридическую очистку и готовы к оформлению в день обращения.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stock Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {STOCK_DATA.map((car, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <CarCard car={car} />
              </Reveal>
            ))}
            
            {/* CTA Card */}
            <Reveal delay={200} className="h-full">
              <div className="h-full group bg-graphite-deep/40 border border-dashed border-border p-10 flex flex-col items-center justify-center text-center transition-smooth hover:border-primary/40">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl text-gradient-soft mb-4">Не нашли что искали?</h3>
                <p className="text-sm text-muted-foreground mb-8 max-w-[240px]">
                  Оставьте заявку на персональный подбор автомобиля из закрытых источников.
                </p>
                <Button asChild variant="outline" className="rounded-sm border-border hover:border-primary transition-smooth text-xs tracking-widest uppercase">
                  <a href="#contact">Индивидуальный подбор</a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 border-y border-border bg-graphite-deep/30">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-12 text-center">
            <Reveal>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-10 h-10 text-primary mb-6" />
                <h4 className="font-display text-xl text-gradient-soft mb-3">Гарантия чистоты</h4>
                <p className="text-sm text-muted-foreground px-4">Полная проверка истории владения и технического состояния каждого авто.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 text-primary mb-6 flex items-center justify-center font-display text-2xl italic">L</div>
                <h4 className="font-display text-xl text-gradient-soft mb-3">Международная логистика</h4>
                <p className="text-sm text-muted-foreground px-4">Отработанные маршруты доставки из Европы и ОАЭ с полным таможенным сопровождением.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-col items-center">
                <Crown className="w-10 h-10 text-primary mb-6" />
                <h4 className="font-display text-xl text-gradient-soft mb-3">Премиальный сервис</h4>
                <p className="text-sm text-muted-foreground px-4">Сопровождение сделки «под ключ» и послепродажная поддержка клиентов.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <SectionLabel>Персональный запрос</SectionLabel>
              <h2 className="font-display text-4xl sm:text-5xl mt-8 text-gradient-soft leading-[1.1]">
                Готовы обсудить <br />
                <span className="italic text-gradient-gold">детали сделки?</span>
              </h2>
              <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-lg">
                Оставьте заявку, и я свяжусь с вами в течение часа для консультации по выбранному автомобилю.
              </p>
              
              <div className="mt-12 space-y-8">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Связь напрямую</div>
                  <div className="flex flex-wrap gap-4">
                    <a href="tel:+79778468567" className="group flex items-center gap-3 p-4 bg-graphite-deep border border-border hover:border-primary transition-smooth rounded-sm">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Звонок</div>
                        <div className="text-sm font-medium">+7 (977) 846-85-67</div>
                      </div>
                    </a>
                    <a href="https://t.me/nixon_motors" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 bg-graphite-deep border border-border hover:border-primary transition-smooth rounded-sm">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                        <Send className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Telegram</div>
                        <div className="text-sm font-medium">@nixon_motors</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="relative p-8 sm:p-12 bg-graphite-deep border border-border shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Crown className="w-24 h-24 text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-8 text-gradient-soft">Оставить заявку</h3>
                <AmoForm />
                <p className="mt-8 text-[11px] text-muted-foreground leading-relaxed text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности <br />
                  и обработки персональных данных.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-graphite-deep">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <div className="font-display text-2xl tracking-tight text-gradient-soft mb-2">Николаев</div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Premium Automotive Expert</div>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-smooth">Главная</a>
              <a href="/stock" className="text-foreground">В наличии</a>
              <a href="/#about" className="hover:text-primary transition-smooth">Об эксперте</a>
              <a href="/#services" className="hover:text-primary transition-smooth">Услуги</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Все права защищены
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
