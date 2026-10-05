import LeadForm from "@/components/LeadForm";
import { MESSENGER_MAX_URL, PHONE, PHONE_FORMATTED, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/brand";
import SiteHeader from "@/components/site/SiteHeader";
import type { StockCar } from "@/data/stock";
import { carClassById } from "@/data/car-classes";
import { catalogFilterUrl, catalogFilters, filterFromSearch } from "@/data/catalog-filters";
import { useCatalog } from "@/lib/chatium-catalog";
import { Link, useSearchParams } from "react-router-dom";
import { useHashScroll } from "@/lib/use-hash-scroll";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { 
  ArrowRight, Phone, Send, Crown,
  ChevronLeft, ChevronRight, Calendar, Gauge, FileText, Landmark,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    setShown(true);
    
    const io = new IntersectionObserver(
      ([e]) => { 
        if (e.isIntersecting) { 
          setShown(true); 
          io.disconnect(); 
        } 
      },
      { threshold: 0.1 }
    );
    
    io.observe(el);
    return () => {
      io.disconnect();
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

type Car = StockCar;

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
      <span className="h-px w-8 bg-primary/60" />
      {children}
    </div>
  );
}

function CarCard({ car }: { car: Car }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const images = car.images?.length > 0 ? car.images : ["https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80"];
  // В карточке фото небольшое, в просмотре во весь экран — крупное
  const imagesFull = car.imagesFull?.length === images.length ? car.imagesFull : images;

  const nextImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Reveal className="group bg-graphite-deep border border-border overflow-hidden rounded-sm hover:border-primary/40 transition-smooth">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => setIsDialogOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setIsDialogOpen(true);
            }
          }}
        >
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
                    type="button"
                    aria-label={`Предыдущее изображение ${car.make} ${car.model}`}
                    onClick={(e) => { e.stopPropagation(); prevImage(e); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/20 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-smooth hover:bg-primary hover:text-primary-foreground"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Следующее изображение ${car.make} ${car.model}`}
                    onClick={(e) => { e.stopPropagation(); nextImage(e); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/20 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-smooth hover:bg-primary hover:text-primary-foreground"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_: string, idx: number) => (
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

        <DialogContent className="max-w-4xl bg-graphite-deep border-border p-0 overflow-hidden sm:rounded-sm custom-scrollbar">
          <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
            <div className="md:w-1/2 relative bg-black">
              <div className="h-full min-h-[300px]">
                <img
                  src={imagesFull[currentImage]}
                  alt={`${car.make} ${car.model} — фотография ${currentImage + 1} из ${images.length}`}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label={`Предыдущее фото ${car.make} ${car.model}`}
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Следующее фото ${car.make} ${car.model}`}
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs text-white/90 backdrop-blur-md" aria-live="polite">
                      {currentImage + 1} / {images.length}
                    </div>
                  </>
                )}
                {images.length > 1 && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto py-2 bg-black/40 backdrop-blur-md">
                    {images.map((img: string, idx: number) => (
                      <button 
                        key={idx}
                        type="button"
                        aria-label={`Показать фото ${idx + 1} автомобиля ${car.make} ${car.model}`}
                        aria-current={idx === currentImage ? "true" : undefined}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-12 h-12 rounded-sm border-2 overflow-hidden shrink-0 transition-all ${idx === currentImage ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
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
                    window.history.pushState(null, '', '#contact');
                    window.dispatchEvent(new CustomEvent('car-selected', { detail: { car: carInfo } }));
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

export default function StockPage({ mode = "stock" }: { mode?: "stock" | "order" | "catalog" }) {
  const [searchParams] = useSearchParams();
  const isOrder = mode === "order";
  const isCatalog = mode === "catalog";

  const catalog = useCatalog();

  // Сначала машины по режиму страницы, затем — выбранная категория из адреса
  const baseCars = catalog.cars.filter((car) =>
    isCatalog || (isOrder ? car.status === "В поставке" : car.status === "В наличии"),
  );
  const activeClass = carClassById(searchParams.get("class"));
  const activeBrand = searchParams.get("brand");
  const cars = baseCars.filter((car) => {
    if (activeClass) return car.carClass === activeClass.id;
    if (activeBrand) return car.make === activeBrand;
    return true;
  });

  // Категории фильтра собираются из самих автомобилей: новая марка появляется сама
  const filters = catalogFilters(baseCars);
  const activeFilter = filterFromSearch(filters, searchParams.get("class"), activeBrand);

  const chipClass = (active: boolean) =>
    `inline-flex h-11 items-center gap-2 border px-5 text-xs uppercase tracking-[0.18em] transition-smooth ${
      active ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
    }`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Если страницу открыли с якорем (#contact), прокручиваем к разделу после отрисовки
  useHashScroll();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container relative z-10">
          <Reveal>
            <div>
              <SectionLabel>{isCatalog ? "Каталог" : isOrder ? "Автомобили в поставке" : "Автомобили в наличии"}</SectionLabel>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display mt-8 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl text-gradient-soft">
              {isCatalog ? <>Автомобили в наличии,<br /><span className="italic text-gradient-gold">в поставке и под заказ.</span></> : isOrder ? <>Премиальный парк,<br /><span className="italic text-gradient-gold">готовящиеся к выдаче.</span></> : <>Премиальный парк,<br /><span className="italic text-gradient-gold">готовый к выдаче.</span></>}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {isCatalog ? "Выбирайте класс или марку — покажу, что есть сейчас и что уже в поставке. Если нужного автомобиля нет, подберу его под ваш запрос." : isOrder ? "Автомобили в этом разделе находятся в поставке и готовятся к передаче. Я контролирую каждый этап — от покупки до выдачи." : "Все представленные автомобили прошли комплексную техническую проверку, юридическую очистку и готовы к оформлению в день обращения."}
            </p>
          </Reveal>

          {isCatalog && filters.length > 0 && (
            <Reveal delay={320}>
              <div className="mt-12 flex flex-wrap gap-3" role="group" aria-label="Категории автомобилей">
                <Link to={catalogFilterUrl(null)} className={chipClass(!activeFilter)}>
                  Все
                  <span className="text-muted-foreground">{baseCars.length}</span>
                </Link>
                {filters.map((filter) => (
                  <Link
                    key={`${filter.kind}-${filter.value}`}
                    to={catalogFilterUrl(filter)}
                    className={chipClass(activeFilter?.value === filter.value && activeFilter?.kind === filter.kind)}
                    aria-current={activeFilter?.value === filter.value && activeFilter?.kind === filter.kind ? "true" : undefined}
                  >
                    {filter.label}
                    <span className="text-muted-foreground">{filter.count}</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
          
        </div>
      </section>

      {/* Stock Grid */}
      <section className="py-20 bg-graphite-deep/30">
        <div className="container">
          {activeFilter && (
            <p className="mb-10 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {activeFilter.label} · {cars.length}
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {cars.length === 0 && (
            <div className="border border-dashed border-border p-10 text-center sm:p-16">
              <p className="font-display text-2xl text-gradient-soft">
                {activeFilter ? `В категории «${activeFilter.label}» пока нет автомобилей` : "Автомобилей пока нет"}
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Подберу под ваш запрос из закрытых дилерских баз Европы, Америки, Китая, Кореи, Японии и ОАЭ —
                расскажите, что ищете.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex h-12 items-center border border-border px-6 text-xs uppercase tracking-[0.2em] transition-smooth hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Оставить заявку
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <SectionLabel>Персональный запр��с</SectionLabel>
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
                    <a href={`tel:${PHONE}`} className="group flex items-center gap-3 p-4 bg-graphite-deep border border-border hover:border-primary transition-smooth rounded-sm">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Звонок</div>
                        <div className="text-sm font-medium">{PHONE_FORMATTED}</div>
                      </div>
                    </a>
                    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 bg-graphite-deep border border-border hover:border-primary transition-smooth rounded-sm">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                        <Send className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Telegram</div>
                        <div className="text-sm font-medium">{TELEGRAM_HANDLE}</div>
                      </div>
                    </a>
                    <a href={MESSENGER_MAX_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 bg-graphite-deep border border-border hover:border-primary transition-smooth rounded-sm">
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
                <LeadForm />
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
              <a href="/catalog" className="hover:text-primary transition-smooth">Автомобили</a>
              <a href="/#about" className="hover:text-primary transition-smooth">Об эксперте</a>
              <a href="/#services" className="hover:text-primary transition-smooth">Услуги</a>
            </div>
  <div className="text-sm text-muted-foreground flex flex-wrap gap-x-8 gap-y-2 justify-end">
  <a href="/privacy-policy" className="text-[8px] hover:text-primary transition-smooth">Политика обработки персональных данных</a>
  <a href="/ai-regulation" className="text-[8px] hover:text-primary transition-smooth">Регламент использования нейросетей и ИИ</a>
  <a href="/cookies" className="text-[8px] hover:text-primary transition-smooth">Политика использования cookies</a>
  <span>© {new Date().getFullYear()} Все права защищены</span>
  </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
