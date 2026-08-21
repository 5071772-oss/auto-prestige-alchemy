import { Phone, MessageCircle, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-graphite-deep py-20 border-t border-border">
      <div className="container">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-3">
              <span className="font-display text-2xl tracking-tight text-gradient-soft">Николаев</span>
              <span className="h-4 w-px bg-border" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Premium auto</span>
            </a>
            <p className="mt-8 text-muted-foreground max-w-sm leading-relaxed">
              Персональный сервис по подбору, покупке и импорту премиальных автомобилей.
              Более 20 лет экспертизы в сегменте Audi, BMW, Mercedes-Benz и выше.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold mb-6">Навигация</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-smooth">Обо мне</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Услуги</a></li>
              <li><a href="#gallery" className="hover:text-primary transition-smooth">Гараж</a></li>
              <li><a href="#contact" className="hover:text-primary transition-smooth">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-foreground font-semibold mb-6">Контакты</h4>
            <div className="space-y-6">
              <a href="tel:+79778468567" className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary transition-smooth">
                  <Phone className="w-4 h-4 text-primary" />
                </span>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-smooth">+7 (977) 846-85-67</span>
              </a>
              <div className="flex gap-4">
                <a
                  href="https://t.me/nixon_motors"
                  className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-smooth"
                >
                  <Send className="w-4 h-4 text-primary" />
                </a>
                <a
                  href="https://max.ru/u/f9LHodD0cOIVAsyAUIkF0DqVhojFVLR45PrJo6LSR3t2ytElHfdljYBKjM0"
                  className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-smooth"
                >
                  <MessageCircle className="w-4 h-4 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60">
            © {new Date().getFullYear()} Николаев Алексей. Все права защищены.
          </p>
          <div className="flex gap-8 text-[11px] uppercase tracking-widest text-muted-foreground/60">
            <a href="#" className="hover:text-foreground transition-smooth">Конфиденциальность</a>
            <a href="#" className="hover:text-foreground transition-smooth">Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
