import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import consentText from "../data/personal-data-consent.txt?raw";

const sections = consentText.split(/(?=^\d+\.\s)/m).filter(Boolean);

function sectionTitle(section: string) {
  return section.split("\n")[0].trim();
}

function sectionBody(section: string) {
  return section.split("\n").slice(1).join("\n").trim();
}

export default function PersonalDataConsent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <Link to="/" className="font-display text-sm uppercase tracking-[0.3em]">AUTO PRESTIGE</Link>
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-smooth">
            <ArrowLeft className="size-4" /> На главную
          </Link>
        </div>
      </header>
      <main className="container py-24 md:py-32">
        <div className="mb-12 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
          <span className="h-px w-8 bg-primary" /> Юридическая информация
        </div>
        <h1 className="max-w-5xl font-display text-[3.25rem] leading-[0.94] tracking-[-0.045em] text-balance sm:text-6xl lg:text-[5.5rem]">
          <span className="text-gradient-soft">Согласие на обработку</span><br />
          <span className="italic text-gradient-gold">персональных данных</span>
        </h1>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-muted-foreground">Редакция от 22 августа 2026 года</p>
        <div className="mt-16 flex flex-col gap-4">
          {sections.map((section, index) => (
            <details key={`${sectionTitle(section)}-${index}`} className="group border border-border">
              <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-7 font-display text-lg marker:hidden">
                <ShieldCheck className="size-5 shrink-0 text-primary" />
                <span>{sectionTitle(section)}</span>
                <span className="ml-auto text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="border-t border-border px-6 pb-8 pt-6 text-sm leading-7 text-muted-foreground">
                {sectionBody(section).split(/\n\s*\n/).map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="mb-4 last:mb-0 whitespace-pre-line">{paragraph.trim()}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </main>
      <footer className="border-t border-border py-12">
        <div className="container flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Николаев Алексей. Все права защищены.</span>
          <div className="flex flex-wrap gap-6 uppercase tracking-[0.3em]">
            <Link to="/privacy-policy" className="text-[11px] hover:text-primary transition-smooth">Политика обработки персональных данных</Link>
            <Link to="/consent" className="text-[11px] hover:text-primary transition-smooth">Согласие на обработку персональных данных</Link>
            <Link to="/ai-regulation" className="text-[11px] hover:text-primary transition-smooth">Регламент использования нейросетей и ИИ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
