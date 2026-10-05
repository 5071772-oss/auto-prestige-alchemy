import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { CAR_CLASSES, carClassUrl } from "@/data/car-classes";

/** Пункты меню вокруг «Автомобилей»: слева и справа от выпадающего меню. */
const linksBefore = [
  ["#about", "Обо мне"],
  ["#services", "Услуги"],
] as const;

const linksAfter = [
  ["#gallery", "Гараж"],
  ["#process", "Процесс"],
  ["#contact", "Контакты"],
] as const;

const linkClass =
  "transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:text-foreground";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carsOpen, setCarsOpen] = useState(false);
  const carsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Меню классов закрывается по Escape и по щелчку мимо него
  useEffect(() => {
    if (!carsOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCarsOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!carsRef.current?.contains(event.target as Node)) setCarsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [carsOpen]);

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
          {linksBefore.map(([href, label]) => (
            <a key={href} href={href} className={linkClass}>
              {label}
            </a>
          ))}

          <div
            ref={carsRef}
            className="relative"
            onMouseEnter={() => setCarsOpen(true)}
            onMouseLeave={() => setCarsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={carsOpen}
              aria-haspopup="true"
              onClick={() => setCarsOpen((open) => !open)}
              className={`flex items-center gap-1.5 ${linkClass} ${carsOpen ? "text-foreground" : ""}`}
            >
              Автомобили
              <ChevronDown
                aria-hidden="true"
                className={`h-3.5 w-3.5 transition-transform ${carsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {carsOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                <ul className="min-w-64 border border-border bg-background/95 p-2 shadow-2xl backdrop-blur-xl">
                  {CAR_CLASSES.map((item) => (
                    <li key={item.id}>
                      <a
                        href={carClassUrl(item.id)}
                        onClick={() => setCarsOpen(false)}
                        className="block px-4 py-3 transition-smooth hover:bg-card focus-visible:bg-card focus-visible:outline-none"
                      >
                        <span className="block text-sm text-foreground">{item.label}</span>
                        <span className="mt-1 block text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                          {item.hint}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {linksAfter.map(([href, label]) => (
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
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
            {linksBefore.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex min-h-11 items-center border-b border-border/60 text-muted-foreground ${linkClass}`}
              >
                {label}
              </a>
            ))}

            <p className="pt-4 pb-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Автомобили</p>
            {CAR_CLASSES.map((item) => (
              <a
                key={item.id}
                href={carClassUrl(item.id)}
                onClick={() => setMenuOpen(false)}
                className={`flex min-h-11 items-center justify-between border-b border-border/60 pl-3 text-muted-foreground ${linkClass}`}
              >
                {item.label}
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">{item.hint}</span>
              </a>
            ))}

            {linksAfter.map(([href, label]) => (
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
