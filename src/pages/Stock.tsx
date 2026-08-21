import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Reveal, SectionLabel } from "@/components/layout/SharedComponents";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Loader2, Phone, Send, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StockPage = () => {
  const { data: cars, isLoading, error } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      
      <main className="pt-32 pb-24">
        <div className="container">
          <Reveal>
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Вернуться на главную
              </Link>
              <SectionLabel>Автомобили в наличии</SectionLabel>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-6 text-gradient-soft">
                Актуальные предложения<br />
                <span className="italic text-gradient-gold">вашего будущего авто.</span>
              </h1>
              <p className="mt-6 text-muted-foreground max-w-2xl text-lg leading-relaxed">
                Здесь представлены автомобили, которые уже проверены, выкуплены и готовы к отправке или уже находятся в пути. Если вы не нашли подходящий вариант — мы подберем его индивидуально.
              </p>
            </div>
          </Reveal>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p>Загружаем список автомобилей...</p>
            </div>
          ) : error ? (
            <div className="text-center py-32 border border-border bg-graphite/30 rounded-sm">
              <p className="text-red-400">Ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>
            </div>
          ) : cars?.length === 0 ? (
            <div className="text-center py-32 border border-border bg-graphite/30 rounded-sm">
              <p className="text-muted-foreground text-lg mb-6">В данный момент все автомобили в наличии забронированы.</p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-glow">
                <Link to="/#contact">Оставить заявку на подбор</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {cars?.map((car, i) => (
                <Reveal key={car.id} delay={(i % 3) * 100}>
                  <div className="group relative overflow-hidden bg-background border border-border flex flex-col h-full">
                    <div className="aspect-[16/10] overflow-hidden bg-graphite">
                      <img
                        src={car.image_url}
                        alt={`${car.brand} ${car.model}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop";
                        }}
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="text-xs uppercase tracking-[0.3em] text-primary">{car.brand}</div>
                      <h3 className="font-display text-2xl mt-3">{car.model}</h3>
                      <div className="text-sm text-muted-foreground mt-2">{car.spec}</div>
                      
                      {car.description && (
                        <p className="mt-4 text-sm text-muted-foreground/80 leading-relaxed line-clamp-3">
                          {car.description}
                        </p>
                      )}

                      <div className="mt-auto pt-8">
                        <Button asChild className="w-full h-12 rounded-sm border border-primary/20 hover:border-primary bg-transparent text-foreground hover:bg-primary/5 transition-smooth">
                          <Link to="/#contact">Забронировать</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>

      <section className="py-24 bg-graphite-deep border-t border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="font-display text-3xl sm:text-4xl text-gradient-soft mb-8">
                Не нашли подходящий автомобиль?
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                Свяжитесь со мной напрямую, и я подберу идеальный вариант под ваши задачи и бюджет.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="tel:+79778468567" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                    <Phone className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-foreground/90 group-hover:text-foreground font-medium">+7 (977) 846-85-67</span>
                </a>
                <a href="https://t.me/nixon_motors" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                    <Send className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-foreground/90 group-hover:text-foreground font-medium">Telegram</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StockPage;
