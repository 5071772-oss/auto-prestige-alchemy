import React, { useEffect, useState } from "react";
import { 
  ArrowLeft, Phone, Send, MessageCircle, ShieldCheck, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          <a href="/stock" className="hover:text-foreground transition-smooth">В наличии</a>
          <a href="/stock2" className="hover:text-foreground transition-smooth">Заказ</a>
          <a href="/#services" className="hover:text-foreground transition-smooth">Услуги</a>
          <a href="/#contact" className="hover:text-foreground transition-smooth">Контакты</a>
        </nav>
        <Button asChild variant="outline" size="sm" className="rounded-sm border-border hover:border-primary transition-smooth">
          <a href="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> На главную
          </a>
        </Button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container grid md:grid-cols-3 gap-12 text-left">
        <div>
          <div className="font-display text-2xl text-gradient-soft">Николаев Алексей</div>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">
            Личный эксперт по премиальным автомобилям. Подбор, импорт и сопровождение
            сделок с 2003 года.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Навигация</div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><a href="/#about" className="hover:text-foreground transition-smooth">Обо мне</a></li>
            <li><a href="/#services" className="hover:text-foreground transition-smooth">Услуги</a></li>
            <li><a href="/stock" className="hover:text-foreground transition-smooth">В наличии</a></li>
            <li><a href="/stock2" className="hover:text-foreground transition-smooth">Заказ</a></li>
            <li><a href="/privacy-policy" className="hover:text-foreground transition-smooth text-primary/90">Политика конфиденциальности</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Контакты</div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><a href="tel:+79778468567" className="hover:text-foreground transition-smooth">+7 (977) 846-85-67</a></li>
            <li><a href="https://t.me/nixon_motors" className="hover:text-foreground transition-smooth">Telegram · @nixon_motors</a></li>
            <li className="flex gap-4 pt-2">
              <a href="https://t.me/nixon_motors" aria-label="Telegram" className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center transition-smooth"><Send className="w-4 h-4" /></a>
              <a href="https://max.ru/u/f9LHodD0cOJqTlPe8YcscWYxH0dzcj7TZq5Q0XOZpxuMXD-qpbOgHkOkLso" target="_blank" rel="noopener noreferrer" aria-label="Max" className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center transition-smooth"><MessageCircle className="w-4 h-4" /></a>
              <a href="tel:+79778468567" aria-label="Phone" className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center transition-smooth"><Phone className="w-4 h-4" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t border-border flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Николаев Алексей. Все права защищены.</div>
        <div className="flex gap-6 uppercase tracking-[0.3em]">
          <a href="/privacy-policy" className="hover:text-primary transition-smooth">Политика обработки персональных данных</a>
        </div>
      </div>
    </footer>
  );
}

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Nav />
      
      <main className="pt-40 pb-24">
        <div className="container max-w-4xl">
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary mb-8">
            <span className="h-px w-8 bg-primary/60" />
            Юридическая информация
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-gradient-soft mb-12">
            Политика обработки<br />
            <span className="italic text-gradient-gold">персональных данных</span>
          </h1>

          <div className="prose prose-invert prose-gold max-w-none text-muted-foreground space-y-8 leading-relaxed">
            <div className="sr-only">
              '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            Разбей полный текст политики на секции и реализуй раскрывающиеся аккордеоны, чтобы документ было удобно читать.
            </div>

            <div className="p-8 border border-border bg-graphite-deep/50 rounded-sm">
              <p className="text-sm italic">
                Для вашего удобства текст политики структурирован по разделам. Нажмите на заголовок раздела, чтобы раскрыть его содержание. Документ регламентирует порядок обработки данных при использовании данного ресурса.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="section-1" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">1. Общие положения</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>
                    Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые Николаевым Алексеем (далее – Оператор).
                  </p>
                  <p>
                    1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
                  </p>
                  <p>
                    1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-2" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">2. Основные понятия, используемые в Политике</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>
                    2.1. Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств вычислительной техники.
                  </p>
                  <p>
                    2.2. Блокирование персональных данных – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).
                  </p>
                  <p>
                    2.3. Веб-сайт – совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу Оператора.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="section-3" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">3. Основные права и обязанности Оператора</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>
                    3.1. Оператор имеет право самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных.
                  </p>
                  <p>
                    3.2. Оператор обязан предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-16 pt-8 border-t border-border flex justify-center">
              <Button asChild variant="link" className="text-primary hover:text-primary-glow uppercase tracking-widest text-xs transition-smooth">
                <a href="/">Вернуться на главную страницу</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
