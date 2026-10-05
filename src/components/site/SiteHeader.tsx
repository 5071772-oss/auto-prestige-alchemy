import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

/**
 * Меню сайта. Разделы про автомобили сведены в один пункт «Автомобили»:
 * категории — Премиум, Лакшери и марки — выбираются фильтром на самой странице.
 */
const links = [
  ["#about", "Обо мне"],
  ["#services", "Услуги"],
  ["/catalog", "Автомобили"],
  ["#gallery", "Гараж"],
  ["#process", "Процесс"],
  ["#contact", "Контакты"],
] as const;

const linkClass =
  "transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:text-foreground";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-smooth ${
        scrolled || menuOpen ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <a href="/#top" className="flex items-center gap-3" aria-label="Николаев Premium Auto — на главную">
          <span className="font-display text-2xl tracking-tight text-gradient-soft">Николаев</span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="hidden text-[11px] uppercase tracking-[0.3em] text-muted-foreground sm:block">
            Premium auto
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex" aria-label="Основная навигация">
          {links.map(([href, label]) => (
            <a key={href} href={href} className={linkClass}>
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="group hidden h-11 items-center gap-2 border border-border px-5 text-sm transition-smooth hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
          >
            Связаться
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Мобильная навигация"
          className="border-t border-border bg-background/95 px-6 py-5 backdrop-blur-xl lg:hidden"
        >
          <div className="container flex flex-col gap-1 text-sm">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex min-h-11 items-center border-b border-border/60 text-muted-foreground ${linkClass}`}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
