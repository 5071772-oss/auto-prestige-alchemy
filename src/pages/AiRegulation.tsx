import React, { useEffect, useMemo } from "react";
import { MESSENGER_MAX_URL, PHONE, PHONE_FORMATTED, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/brand";
import { ArrowLeft, MessageCircle, Phone, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import regulationText from "../data/ai-regulation-source.txt?raw";

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-tight text-gradient-soft">Николаев</span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="hidden text-[11px] uppercase tracking-[0.3em] text-muted-foreground sm:block">Premium auto</span>
        </a>
        <Button asChild variant="outline" size="sm" className="rounded-sm border-border hover:border-primary transition-smooth">
          <a href="/"><ArrowLeft className="mr-2 h-4 w-4" /> На главную</a>
        </Button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container grid gap-12 text-left md:grid-cols-3">
        <div>
          <div className="font-display text-2xl text-gradient-soft">Николаев Алексей</div>
          <p className="mt-3 max-w-xs text-xs text-muted-foreground">Личный эксперт по премиальным автомобилям. Подбор, импорт и сопровождение сделок с 2003 года.</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Навигация</div>
          <ul className="mt-5 flex flex-col gap-3 text-xs text-muted-foreground">
            <li><a href="/#about" className="hover:text-foreground transition-smooth">Обо мне</a></li>
            <li><a href="/stock" className="hover:text-foreground transition-smooth">В наличии</a></li>
            <li><a href="/order" className="hover:text-foreground transition-smooth">Заказ</a></li>
            <li><a href="/privacy-policy" className="hover:text-foreground transition-smooth">Политика обработки персональных данных</a></li>
            <li><a href="/ai-regulation" className="text-primary/90 hover:text-primary transition-smooth">Регламент использования ИИ</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Контакты</div>
          <ul className="mt-5 flex flex-col gap-3 text-xs text-muted-foreground">
            <li><a href={`tel:${PHONE}`} className="hover:text-foreground transition-smooth">{PHONE_FORMATTED}</a></li>
            <li><a href={TELEGRAM_URL} className="hover:text-foreground transition-smooth">Telegram · {TELEGRAM_HANDLE}</a></li>
            <li className="flex gap-4 pt-2">
              <a href={TELEGRAM_URL} aria-label="Telegram" className="flex h-9 w-9 items-center justify-center border border-border hover:border-primary transition-smooth"><Send className="h-4 w-4" /></a>
              <a href={`tel:${PHONE}`} aria-label="Телефон" className="flex h-9 w-9 items-center justify-center border border-border hover:border-primary transition-smooth"><Phone className="h-4 w-4" /></a>
              <a href={MESSENGER_MAX_URL} target="_blank" rel="noopener noreferrer" aria-label="Max" className="flex h-9 w-9 items-center justify-center border border-border hover:border-primary transition-smooth"><MessageCircle className="h-4 w-4" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t border-border flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Николаев Алексей. Все права защищены.</div>
        <div className="flex gap-6 uppercase tracking-[0.3em]">
          <a href="/privacy-policy" className="text-[8px] hover:text-primary transition-smooth">Политика обработки персональных данных</a>
          <a href="/ai-regulation" className="text-[8px] hover:text-primary transition-smooth">Регламент использования нейросетей и ИИ</a>
        </div>
      </div>
    </footer>
  );
}

function parseSections(text: string) {
  const lines = text.split(/\r?\n/);
  const title = lines[0].replace(/^#\s*/, "");
  const sections: { heading: string; body: string[] }[] = [];
  let current: { heading: string; body: string[] } | null = null;
  for (const line of lines.slice(1)) {
    if (/^#{1,3}\s+/.test(line)) {
      if (current) sections.push(current);
      current = { heading: line.replace(/^#{1,3}\s+/, ""), body: [] };
    } else if (current && line.trim() !== "---") {
      current.body.push(line);
    }
  }
  if (current) sections.push(current);
  return { title, sections };
}

function SectionBody({ lines }: { lines: string[] }) {
  const blocks = lines.join("\n").split(/\n\s*\n/).filter(Boolean);
  return <div className="flex flex-col gap-4 text-sm leading-7 text-muted-foreground md:text-base">
    {blocks.map((block, index) => {
      const rows = block.split("\n").filter(Boolean);
      if (rows.every((row) => /^\s*(?:\*|-|\d+\.)\s+/.test(row))) {
        return <ul key={index} className="flex list-disc flex-col gap-2 pl-6">{rows.map((row) => <li key={row}>{row.replace(/^\s*(?:\*|-|\d+\.)\s+/, "")}</li>)}</ul>;
      }
      if (rows[0].startsWith("|") && rows.length > 2) {
        return <div key={index} className="overflow-x-auto"><table className="min-w-full border-collapse text-left text-sm"><tbody>{rows.filter((row) => !/^\|\s*-/.test(row)).map((row) => <tr key={row} className="border-b border-border">{row.split("|").slice(1, -1).map((cell) => <td key={cell} className="p-3 align-top">{cell.trim()}</td>)}</tr>)}</tbody></table></div>;
      }
      return <p key={index}>{rows.map((row, rowIndex) => <React.Fragment key={row}>{rowIndex > 0 && <br />}{row.replace(/^>\s*/, "")}</React.Fragment>)}</p>;
    })}
  </div>;
}

export default function AiRegulation() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const document = useMemo(() => parseSections(regulationText), []);
  return <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
    <Nav />
    <main className="container px-4 pb-24 pt-36 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary"><ShieldCheck className="h-4 w-4" /> Юридическая информация</div>
        <h1 className="max-w-5xl font-display text-[3.25rem] leading-[0.94] tracking-[-0.045em] text-balance sm:text-6xl lg:text-[5.5rem]"><span className="text-gradient-soft">Регламент использования</span><br /><span className="italic text-gradient-gold">нейросетей и ИИ</span></h1>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">Локальный регламент использования нейросетей и сервисов искусственного интеллекта.</p>
        <Accordion type="multiple" className="mt-14">
          {document.sections.map((section, index) => <AccordionItem key={`${section.heading}-${index}`} value={`section-${index}`} className="border-border">
            <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline md:text-2xl"><span className="flex items-center gap-4"><ShieldCheck className="h-5 w-5 shrink-0 text-primary" />{section.heading}</span></AccordionTrigger>
            <AccordionContent className="pb-8"><SectionBody lines={section.body} /></AccordionContent>
          </AccordionItem>)}
        </Accordion>
      </div>
    </main>
    <Footer />
  </div>;
}
