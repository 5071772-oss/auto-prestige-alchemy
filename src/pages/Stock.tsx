import AmoForm from "@/components/AmoForm";
import StockImport from "@/components/StockImport";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowRight, ArrowUpRight, Phone, Send, ShieldCheck, Crown,
  Calendar, Gauge, Fuel, Zap, Palette, Info, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import stockBmw from "@/assets/stock-bmw-x5.jpg";

// Re-import with proper names to avoid conflicts
import { 
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
  ShieldCheck as ShieldCheckIcon,
  Crown as CrownIcon,
  Loader2 as Loader2Icon
} from "lucide-react";

type Car = {
  id: string;
  make: string;
  model: string;
  year: number | null;
  price: number | null;
  mileage: number | null;
  engine_type: string | null;
  power: number | null;
  color: string | null;
  status: string | null;
  description: string | null;
  images: string[] | null;
};

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
          <ArrowUpRightIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </header>
  );
}

export default function Stock() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-8">
            <Reveal delay={240}>
              <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Все представленные автомобили прошли комплексную техническую проверку, 
                юридическую очистку и готовы к оформлению в день обращения.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <StockImport />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stock Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2Icon className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground uppercase tracking-widest text-xs">Загрузка каталога...</p>
            </div>
          ) : cars.length > 0 ? (
            <div className="grid lg:grid-cols-1 gap-12">
              {cars.map((car, index) => (
                <Reveal key={car.id} delay={index * 100}>
                  <div className="group relative bg-graphite-deep border border-border overflow-hidden">
                    <div className="grid lg:grid-cols-2">
                      {/* Car Image */}
                      <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                        <img 
                          src={car.images && car.images.length > 0 ? car.images[0] : stockBmw} 
                          alt={`${car.make} ${car.model}`} 
                          className="w-full h-full object-cover transition-smooth duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6 flex gap-2">
                          <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold">
                            {car.status || 'В наличии'}
                          </span>
                        </div>
                      </div>

                      {/* Car Details */}
                      <div className="p-8 sm:p-12 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="font-display text-3xl sm:text-4xl text-gradient-soft">
                                {car.make} {car.model}
                              </h2>
                              <p className="text-muted-foreground mt-2 uppercase tracking-[0.2em] text-xs">
                                {car.color || 'Premium Selection'}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-display text-primary">
                                {car.price ? new Intl.NumberFormat('ru-RU').format(car.price) : '—'} ₽
                              </div>
                              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">С учётом утильсбора</div>
                            </div>
                          </div>

                          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                                <CalendarIcon className="w-4 h-4 text-primary/60" />
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Год</div>
                                <div className="text-sm font-medium">{car.year}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                                <GaugeIcon className="w-4 h-4 text-primary/60" />
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Пробег</div>
                                <div className="text-sm font-medium">{new Intl.NumberFormat('ru-RU').format(car.mileage || 0)} км</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                                <FuelIcon className="w-4 h-4 text-primary/60" />
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Двигатель</div>
                                <div className="text-sm font-medium">{car.engine_type}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                                <ZapIcon className="w-4 h-4 text-primary/60" />
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Мощность</div>
                                <div className="text-sm font-medium">{car.power} л.с.</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                                <PaletteIcon className="w-4 h-4 text-primary/60" />
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Цвет</div>
                                <div className="text-sm font-medium">{car.color}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                                <InfoIcon className="w-4 h-4 text-primary/60" />
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Статус</div>
                                <div className="text-sm font-medium">{car.status}</div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-sm">
                            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">Комплектация / Описание</div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {car.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
                          <Button asChild size="lg" className="h-14 px-8 rounded-sm bg-primary text-primary-foreground hover:bg-primary-glow transition-smooth text-sm tracking-wide uppercase flex-1 sm:flex-none">
                            <a href="#contact">
                              Забронировать <ArrowUpRightIcon className="ml-2 w-4 h-4" />
                            </a>
                          </Button>
                          <Button variant="outline" size="lg" className="h-14 px-8 rounded-sm border-border hover:border-primary transition-smooth text-sm tracking-wide uppercase flex-1 sm:flex-none">
                            <a href="#contact">Получить PDF-презентацию</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-40 border border-dashed border-border/60">
              <Reveal>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
                  <ShieldCheckIcon className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-3xl text-gradient-soft">Раздел наполняется</h2>
                <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                  В данный момент мы обновляем каталог доступных автомобилей. 
                  Оставьте заявку, чтобы получить актуальный список в PDF.
                </p>
              </Reveal>
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
                        <PhoneIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Звонок</div>
                        <div className="text-sm font-medium">+7 (977) 846-85-67</div>
                      </div>
                    </a>
                    <a href="https://t.me/nixon_motors" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 bg-graphite-deep border border-border hover:border-primary transition-smooth rounded-sm">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                        <SendIcon className="w-5 h-5" />
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
                  <CrownIcon className="w-24 h-24 text-primary" />
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
