import AmoForm from "@/components/AmoForm";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { 
  ArrowRight, ArrowUpRight, Phone, Send, ShieldCheck, Crown, 
  ChevronLeft, ChevronRight, Calendar, Gauge, FileText, Landmark,
  RefreshCcw, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { syncCarsFromGoogleSheet } from "@/utils/syncStock";
import { syncCarsFromGoogleSheetsConnector } from "@/utils/googleSheetsSync";
import { useToast } from "@/components/ui/use-toast";

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const timer = setTimeout(() => setShown(true), 2000 + delay);
    
    const io = new IntersectionObserver(
      ([e]) => { 
        if (e.isIntersecting) { 
          setShown(true); 
          clearTimeout(timer);
          io.disconnect(); 
        } 
      },
      { threshold: 0.1 }
    );
    
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
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

function CarCard({ car }: { car: any }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const images = car.images?.length > 0 ? car.images : ["https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80"];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Reveal className="group bg-graphite-deep border border-border overflow-hidden rounded-sm hover:border-primary/40 transition-smooth">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={images[currentImage]} 
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(e); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/20 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-smooth hover:bg-primary hover:text-primary-foreground"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(e); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/20 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-smooth hover:bg-primary hover:text-primary-foreground"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_: any, idx: number) => (
                      <div 
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentImage ? "w-4 bg-primary" : "w-1 bg-white/40"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-display text-gradient-soft">{car.make} {car.model}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {car.year}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> {car.mileage?.toLocaleString()} км</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-end">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Наличные</div>
                  <div className="text-xl font-medium text-foreground">{car.price_cash}</div>
                </div>
                {car.price_vat && (
                  <div className="flex justify-between items-end border-t border-border pt-2">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">С НДС</div>
                    <div className="text-sm text-primary font-medium">{car.price_vat}</div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 text-[10px] leading-tight text-muted-foreground uppercase tracking-wider">
                <div className="flex items-start gap-2 p-3 bg-background/50 border border-border rounded-sm">
                  <Landmark className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    Статус: <span className={`block mt-0.5 ${car.status?.toLowerCase().includes('заказ') ? 'text-primary italic' : 'text-foreground'}`}>{car.status || 'В наличии'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-3 bg-primary/5 border border-primary/20 rounded-sm group-hover:bg-primary/10 transition-smooth">
                  <span className="text-primary font-medium tracking-[0.2em]">Подробнее</span>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-4xl bg-graphite-deep border-border p-0 overflow-hidden sm:rounded-sm custom-scrollbar">
          <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
            <div className="md:w-1/2 relative bg-black">
              <div className="h-full min-h-[300px]">
                <img 
                  src={images[currentImage]} 
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto py-2 bg-black/40 backdrop-blur-md">
                    {images.map((img: string, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-12 h-12 rounded-sm border-2 overflow-hidden shrink-0 transition-all ${idx === currentImage ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-100'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 overflow-y-auto custom-scrollbar">
              <DialogHeader className="text-left mb-8">
                <div className="text-xs text-primary uppercase tracking-[0.3em] mb-2">{car.status || 'В наличии'}</div>
                <DialogTitle className="text-3xl font-display text-gradient-soft mb-2">{car.make} {car.model}</DialogTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {car.year} год</span>
                  <span className="flex items-center gap-1"><Gauge className="w-4 h-4" /> {car.mileage?.toLocaleString()} км</span>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/50 border border-border rounded-sm">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Наличные</div>
                    <div className="text-xl font-medium text-foreground">{car.price_cash}</div>
                  </div>
                  {car.price_vat && (
                    <div className="p-4 bg-background/50 border border-border rounded-sm">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">С НДС</div>
                      <div className="text-xl font-medium text-primary">{car.price_vat}</div>
                    </div>
                  )}
                </div>

                {car.specs && (
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Комплектация
                    </h4>
                    <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap bg-background/30 p-4 border border-border rounded-sm italic">
                      {car.specs}
                    </div>
                  </div>
                )}

                {car.description && (
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">Описание</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {car.description}
                    </p>
                  </div>
                )}

                <Button 
                  onClick={() => {
                    const carInfo = `${car.make} ${car.model}`;
                    setIsDialogOpen(false);
                    window.history.pushState(null, '', `#contact?car=${encodeURIComponent(carInfo)}`);
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      setTimeout(() => {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className="w-full h-14 bg-primary hover:bg-primary-glow text-primary-foreground rounded-sm transition-smooth group/btn text-sm tracking-widest uppercase"
                >
                  Забронировать <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Reveal>
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

export default function Stock() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    const sheetId = prompt("Введите ID вашей Google Таблицы (из URL таблицы):\nНапример: 1NNC5Z3fDUYh8NLN_bJ8j5qgFfdTF3xcSE-j33NKr4H0");
    if (!sheetId) return;

    toast({
      title: "Синхронизация через Connector...",
      description: "Загружаем данные из таблицы с помощью Google Sheets Connector.",
    });

    try {
      const result = await syncCarsFromGoogleSheetsConnector(sheetId);
      if (result.success) {
        toast({
          title: "Успех!",
          description: `Синхронизировано ${result.count} автомобилей.`,
        });
        fetchCars();
      } else {
        throw new Error(result.error || "Sync failed");
      }
    } catch (err: any) {
      console.error("Sync error:", err);
      toast({
        title: "Ошибка",
        description: err.message || "Не удалось синхронизировать данные через Connector.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container relative z-10">
          <Reveal>
            <div onDoubleClick={handleSync} className="cursor-default">
              <SectionLabel>Автомобили в наличии</SectionLabel>
            </div>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[16/20] bg-graphite border border-border rounded-sm" />
              ))}
            </div>
          ) : cars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
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
                Оставьте заявку, и я подберу идеальный вариант под ваши критерии из закрытых дилерских баз Европы, Америки, Китая, Кореи, Японии и ОАЭ.
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
                    <a href="https://max.ru/u/f9LHodD0cOJqTlPe8YcscWYxH0dzcj7TZq5Q0XOZpxuMXD-qpbOgHkOkLso" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 bg-graphite-deep border border-border hover:border-primary transition-smooth rounded-sm">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Max</div>
                        <div className="text-sm font-medium">Messenger</div>
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
