import AmoForm from "@/components/AmoForm";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { 
  ArrowRight, ArrowUpRight, Phone, Send, ShieldCheck, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

type Car = {
  id: string;
  make: string;
  model: string;
  description: string | null;
  year: number | null;
  price: number | null;
  mileage: number | null;
  engine_type: string | null;
  power: number | null;
  color: string | null;
  images: string[] | null;
};

export default function Stock() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const { data } = await (supabase as any)
        .from("cars")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false });
      setCars((data as Car[]) ?? []);
      setLoading(false);
    })();
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
      <section className="py-20 bg-graphite-deep/30">
        <div className="container">
          {loading ? (
            <div className="text-center py-40 text-muted-foreground">Загружаем каталог…</div>
          ) : cars.length === 0 ? (
            <div className="text-center py-40 border border-dashed border-border/60">
              <Reveal>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
                  <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-3xl text-gradient-soft">Раздел наполняется</h2>
                <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                  В данный момент мы обновляем каталог доступных автомобилей.
                  Оставьте заявку, чтобы получить актуальный список в PDF.
                </p>
                <div className="mt-10">
                  <Button asChild size="lg" className="h-14 px-8 rounded-sm bg-primary text-primary-foreground hover:bg-primary-glow transition-smooth text-sm tracking-wide uppercase">
                    <a href="#contact">
                      Получить список в PDF <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, i) => (
                <Reveal key={car.id} delay={i * 80}>
                  <article className="group h-full flex flex-col bg-graphite-deep border border-border hover:border-primary/60 transition-smooth rounded-sm overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden bg-background/40">
                      {car.images?.[0] ? (
                        <img
                          src={car.images[0]}
                          alt={`${car.make} ${car.model}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
                          Фото по запросу
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{car.make}</div>
                      <h3 className="font-display text-2xl mt-2 text-gradient-soft">{car.model}</h3>
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        {car.year && <span>{car.year} г.</span>}
                        {car.mileage != null && <span>{car.mileage.toLocaleString("ru-RU")} км</span>}
                        {car.engine_type && <span>{car.engine_type}</span>}
                        {car.power != null && <span>{car.power} л.с.</span>}
                        {car.color && <span>{car.color}</span>}
                      </div>
                      {car.description && (
                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">{car.description}</p>
                      )}
                      <div className="mt-6 pt-6 border-t border-border flex items-center justify-between gap-4">
                        <div className="text-lg font-medium">
                          {car.price != null
                            ? `${Number(car.price).toLocaleString("ru-RU")} ₽`
                            : "Цена по запросу"}
                        </div>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:gap-3 transition-all"
                        >
                          Запросить <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-32 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <SectionLabel>Персональный запрос</SectionLabel>
              <h2 className="font-display text-4xl sm:text-5xl mt-8 text-gradient-soft leading-[1.1]">
                Не нашли нужный <br />
                <span className="italic text-gradient-gold">автомобиль в наличии?</span>
              </h2>
              <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-lg">
                Оставьте заявку, и я подберу идеальный вариант под ваши критерии 
                из закрытых дилерских баз Европы и ОАЭ.
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
