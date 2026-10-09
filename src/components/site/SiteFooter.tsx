import { MessageCircle, Phone, Send } from "lucide-react";
import { MESSENGER_MAX_URL, PHONE, PHONE_FORMATTED, TELEGRAM_URL } from "@/lib/brand";

const navigation: [string, string][] = [
  ["/#about", "Обо мне"],
  ["/#services", "Услуги"],
  ["/catalog", "Автомобили"],
  ["/#gallery", "Гараж"],
  ["/#process", "Процесс"],
];

/** Отдельные страницы: классы машин, финансирование, ход сделки. */
const sections: [string, string][] = [
  ["/premium", "Премиум"],
  ["/luxury", "Лакшери"],
  ["/exclusive", "Эксклюзив"],
  ["/leasing", "Лизинг и кредит"],
  ["/support", "Как проходит сделка"],
];

const legal = [
  ["/privacy-policy", "Политика обработки персональных данных"],
  ["/ai-regulation", "Регламент использования нейросетей и ИИ"],
  ["/consent", "Согласие на обработку персональных данных"],
  ["/cookies", "Политика использования cookies"],
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-2xl text-gradient-soft">Николаев Алексей</div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">Личный эксперт по премиальным автомобилям. Подбор, импорт и сопровождение сделок с 2003 года.</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Навигация</div>
          <nav aria-label="Навигация по сайту" className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            {navigation.map(([href, label]) => <a key={href} href={href} className="transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</a>)}
          </nav>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Разделы</div>
          <nav aria-label="Разделы каталога" className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            {sections.map(([href, label]) => <a key={href} href={href} className="transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</a>)}
          </nav>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Контакты</div>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            <a href={`tel:${PHONE}`} className="transition-smooth hover:text-foreground">{PHONE_FORMATTED}</a>
            <a href="mailto:hello@nikolaev-auto.ru" className="transition-smooth hover:text-foreground">hello@nikolaev-auto.ru</a>
            <div className="flex gap-4 pt-2">
              <a href={TELEGRAM_URL} aria-label="Telegram" className="flex size-9 items-center justify-center border border-border transition-smooth hover:border-primary"><Send aria-hidden="true" /></a>
              <a href={MESSENGER_MAX_URL} target="_blank" rel="noopener noreferrer" aria-label="Max" className="flex size-9 items-center justify-center border border-border transition-smooth hover:border-primary"><MessageCircle aria-hidden="true" /></a>
              <a href={`tel:${PHONE}`} aria-label="Телефон" className="flex size-9 items-center justify-center border border-border transition-smooth hover:border-primary"><Phone aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-12 grid gap-6 border-t border-border pt-8 text-xs text-muted-foreground md:grid-cols-[1fr_auto] md:items-start">
        <div className="leading-relaxed">© {new Date().getFullYear()} Николаев Алексей. Все права защищены.</div>
        <div className="md:max-w-xl">
          <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">Юридическая информация</div>
          <nav aria-label="Юридическая информация" className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {legal.map(([href, label]) => <a key={href} href={href} className="text-xs leading-relaxed transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</a>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
