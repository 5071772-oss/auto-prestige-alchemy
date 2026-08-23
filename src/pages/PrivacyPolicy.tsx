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
                                        
                                            
                                            25. Заключительные положения

25.1. Настоящая Политика действует бессрочно до ее замены новой редакцией.

25.2. Во всем, что не урегулировано настоящей Политикой, Оператор руководствуется законодательством Российской Федерации.

25.3. По вопросам, связанным с обработкой персональных данных, субъект персональных данных может обратиться к Оператору по адресу электронной почты:

5071772@gmail.com

или по почтовому адресу:

143909, Московская область, г. Балашиха, Московский б-р, д. 1/13, кв. 215.
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
                    1.1. Настоящая Политика обработки персональных данных определяет порядок обработки и обеспечения безопасности персональных данных, осуществляемых Николаевым Алексеем Викторовичем, являющимся плательщиком налога на профессиональный доход, далее — Оператор.
                  </p>
                  <p>
                    1.2. Настоящая Политика разработана в соответствии с Конституцией Российской Федерации, Федеральным законом от 27 июля 2006 года № 152-ФЗ «О персональных данных», иными федеральными законами и нормативными правовыми актами Российской Федерации в области персональных данных.
                  </p>
                  <p>
                    1.3. При обработке персональных данных Оператор руководствуется действующей редакцией Федерального закона от 27 июля 2006 года № 152-ФЗ «О персональных данных», включая положения статьи 12 с учетом изменений, внесенных Федеральным законом от 26 июля 2026 года № 265-ФЗ, а также требованиями статей 18.1, 19 и 22 Федерального закона № 152-ФЗ.
                  </p>
                  <p>
                    1.4. Настоящая Политика применяется ко всей информации, которую Оператор может получить о субъектах персональных данных при использовании сайта:<br />
                    <a href="https://auto-prestige-alchemy.relaxdev.ru/" className="text-primary hover:underline">https://auto-prestige-alchemy.relaxdev.ru/</a><br />
                    а также при обращении к Оператору посредством телефонной связи, электронной почты, мессенджеров, социальных сетей и иных используемых Оператором каналов связи.
                  </p>
                  <p>
                    1.5. Настоящая Политика является общедоступным документом и размещается в свободном доступе на сайте Оператора.
                  </p>
                  <p>
                    1.6. Оператор принимает необходимые и достаточные правовые, организационные и технические меры для обеспечения выполнения обязанностей, предусмотренных законодательством Российской Федерации о персональных данных.
                  </p>
                  <p>
                    1.7. Настоящая Политика не заменяет собой согласие субъекта персональных данных в случаях, когда получение такого согласия требуется законодательством Российской Федерации.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-2" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">2. Сведения об операторе</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p><strong>Полное наименование:</strong> Самозанятый Николаев Алексей Викторович.</p>
                  <p><strong>Краткое наименование:</strong> СМЗ Николаев А. В.</p>
                  <p><strong>ИНН:</strong> 500101036007.</p>
                  <p><strong>Адрес Оператора:</strong> 143909, Московская область, г. Балашиха, Московский б-р, д. 1/13, кв. 215.</p>
                  <p><strong>Адрес сайта:</strong> <a href="https://auto-prestige-alchemy.relaxdev.ru/" className="text-primary hover:underline">https://auto-prestige-alchemy.relaxdev.ru/</a></p>
                  <p><strong>Адрес электронной почты:</strong> <a href="mailto:5071772@gmail.com" className="text-primary hover:underline">5071772@gmail.com</a></p>
                  <p><strong>Оператор:</strong> Николаев Алексей Викторович.</p>
                  <p><strong>Ответственное лицо:</strong> Николаев Алексей Викторович, самостоятельно.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="section-3" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">3. Основные понятия</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>3.1. Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому физическому лицу.</p>
                  <p>3.2. Субъект персональных данных — физическое лицо, к которому относятся персональные данные.</p>
                  <p>3.3. Обработка персональных данных — любое действие или совокупность действий, совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными.</p>
                  <p>3.4. Оператор персональных данных — лицо, самостоятельно или совместно с другими лицами организующее и осуществляющее обработку персональных данных, а также определяющее цели обработки персональных данных, состав персональных данных, подлежащих обработке, и действия, совершаемые с персональными данными.</p>
                  <p>3.5. Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники.</p>
                  <p>3.6. Предоставление персональных данных — действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.</p>
                  <p>3.7. Распространение персональных данных — действия, направленные на раскрытие персональных данных неопределенному кругу лиц.</p>
                  <p>3.8. Уничтожение персональных данных — действия, в результате которых становится невозможным восстановить содержание персональных данных в информационной системе персональных данных и или в результате которых уничтожаются материальные носители персональных данных.</p>
                  <p>3.9. Обезличивание персональных данных — действия, в результате которых становится невозможным без использования дополнительной информации определить принадлежность персональных данных конкретному субъекту персональных данных.</p>
                  <p>3.10. Трансграничная передача персональных данных — передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому лицу или иностранному юридическому лицу.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-4" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">4. Категории субъектов персональных данных</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>Оператор может обрабатывать персональные данные следующих категорий субъектов:</p>
                  <p>4.1. Клиенты — физические лица, обратившиеся к Оператору за подбором, приобретением, организацией доставки автомобиля или консультационными услугами.</p>
                  <p>4.2. Потенциальные клиенты и посетители сайта — физические лица, посещающие сайт Оператора, направляющие обращения, оставляющие заявки, заказывающие обратный звонок, запрашивающие консультацию или информацию об автомобилях и услугах.</p>
                  <p>4.3. Подписчики — физические лица, добровольно подписавшиеся на получение информационных материалов, новостей, предложений или иных сообщений Оператора.</p>
                  <p>Оператор не осуществляет в рамках настоящей Политики обработку персональных данных работников и соискателей.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-5" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">5. Цели обработки персональных данных</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display text-foreground mb-2">5.1. Обработка обращений и заявок</h4>
                      <p>Персональные данные обрабатываются для: приема и регистрации обращений; обработки заявок, направленных через сайт; обратной связи; ответа на вопросы; уточнения сведений; предоставления запрошенной информации.</p>
                    </div>
                    <div>
                      <h4 className="font-display text-foreground mb-2">5.2. Подбор автомобилей</h4>
                      <p>Персональные данные обрабатываются для: выяснения потребностей клиента; подбора автомобиля по параметрам; подготовки предложений; связи с клиентом; предоставления информации о доступных вариантах.</p>
                    </div>
                    <div>
                      <h4 className="font-display text-foreground mb-2">5.3. Приобретение и организация доставки автомобилей</h4>
                      <p>Персональные данные обрабатываются для: консультирования; подготовки предложений; организации взаимодействия; консультирования по вопросам доставки из Японии, Китая, Кореи, США, ОАЭ и других государств; исполнения обязательств по договору.</p>
                    </div>
                    <div>
                      <h4 className="font-display text-foreground mb-2">5.4. Консультационные услуги</h4>
                      <p>Персональные данные обрабатываются для: предоставления консультаций; согласования времени и способа проведения; связи с клиентом; исполнения обязательств.</p>
                    </div>
                    <div>
                      <h4 className="font-display text-foreground mb-2">5.5. Информирование</h4>
                      <p>При наличии правового основания персональные данные могут обрабатываться для: направления информационных и рекламных сообщений; информирования об автомобилях, услугах и спецпредложениях. Согласие на рекламу оформляется отдельно.</p>
                    </div>
                    <div>
                      <h4 className="font-display text-foreground mb-2">5.6. Обеспечение работы сайта</h4>
                      <p>Технические данные могут обрабатываться для: обеспечения функционирования и безопасности сайта; предотвращения неправомерных действий; диагностики ошибок; защиты сайта и пользователей.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-6" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">6. Состав обрабатываемых персональных данных</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>В зависимости от цели и способа обращения Оператор может обрабатывать следующие персональные данные:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Ф.И.О. или Имя (при добровольном предоставлении).</li>
                    <li>Номер телефона и адрес электронной почты.</li>
                    <li>Сведения в комментариях или сообщениях.</li>
                    <li>Сведения о желаемом автомобиле (марка, модель, характеристики).</li>
                    <li>Сведения о бюджете и параметрах подбора.</li>
                    <li>Сведения в переписке, необходимые для услуг.</li>
                    <li>Технические сведения (IP-адрес, данные об устройстве, куки и т.д.).</li>
                  </ul>
                  <p className="mt-4 italic">
                    Оператор не осуществляет намеренный сбор специальных категорий персональных данных и не обрабатывает биометрические данные.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-7" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">7. Правовые основания обработки персональных данных</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>Правовыми основаниями обработки персональных данных являются:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Конституция Российской Федерации.</li>
                    <li>Федеральный закон № 152-ФЗ «О персональных данных».</li>
                    <li>Применимые законы и акты РФ.</li>
                    <li>Согласие субъекта персональных данных.</li>
                    <li>Договоры с участием субъекта или по его инициативе.</li>
                    <li>Законные интересы Оператора или третьих лиц (без нарушения прав субъекта).</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-8" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">8. Принципы обработки персональных данных</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>Оператор осуществляет обработку персональных данных на основе следующих принципов:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Законность и справедливость обработки.</li>
                    <li>Ограничение обработки достижением конкретных и законных целей.</li>
                    <li>Недопущение обработки, несовместимой с целями сбора.</li>
                    <li>Недопущение объединения баз данных для несовместимых целей.</li>
                    <li>Обработка только тех данных, которые отвечают целям.</li>
                    <li>Соответствие объема данных заявленным целям (отсутствие избыточности).</li>
                    <li>Обеспечение точности, достаточности и актуальности данных.</li>
                    <li>Уничтожение или обезличивание данных после достижения целей.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-9" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">9. Способы и действия с персональными данными</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>Обработка осуществляется автоматизированным и неавтоматизированным способами.</p>
                  <p>В процессе обработки могут осуществляться: сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование, блокирование, удаление, уничтожение, обезличивание, предоставление (по закону или договору).</p>
                  <p className="mt-4">Распространение данных неопределенному кругу лиц без правового основания не осуществляется.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-10" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">10. Получение персональных данных через сайт</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>10.1. Данные предоставляются путем заполнения форм на сайте.</p>
                  <p>10.2. До отправки формы доступна ссылка на настоящую Политику.</p>
                  <p>10.3–10.4. Согласие запрашивается отдельно; чекбокс не должен быть установлен по умолчанию.</p>
                  <p>10.5–10.6. Согласие на рекламу оформляется отдельно. Отказ от рекламы не влияет на получение основных услуг.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-11" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">11. Сроки обработки и хранения персональных данных</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>11.1. Данные обрабатываются не дольше, чем этого требуют цели обработки.</p>
                  <p>11.2–11.3. Данные по заявкам хранятся до достижения цели; данные клиентов — на срок действия договора и установленный законом срок после.</p>
                  <p>11.4–11.5. Данные на основании согласия (в т.ч. рекламные) обрабатываются до достижения целей или отзыва согласия.</p>
                  <p>11.6. После достижения целей или отзыва согласия данные уничтожаются или обезличиваются.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-12" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">12. Передача персональных данных третьим лицам</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>12.1–12.2. Передача данных третьим лицам осуществляется только на законных основаниях для обеспечения деятельности Оператора.</p>
                  <p>12.3. Категории используемых сервисов:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>CRM-система amoCRM;</li>
                    <li>Мессенджеры Telegram и MAX;</li>
                    <li>Социальная сеть VK;</li>
                    <li>Сервисы телефонии;</li>
                    <li>IT-платформа Lovable (техническое сопровождение).</li>
                  </ul>
                  <p>12.4–12.6. Передача строго ограничена целями обработки; принимаются меры по обеспечению конфиденциальности при поручении обработки.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-13" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">13. Трансграничная передача персональных данных</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>13.1–13.2. Трансграничная передача осуществляется при необходимости, с соблюдением ст. 12 ФЗ-152 и уведомлением уполномоченного органа.</p>
                  <p>13.3–13.4. Оператор руководствуется утвержденным перечнем государств, обеспечивающих адекватную защиту прав субъектов.</p>
                  <p>13.5. До начала передачи Оператор проводит оценку условий передачи (категории данных, получатель, страна, наличие оснований).</p>
                  <p>13.6. Передача не осуществляется до выполнения всех законодательных требований РФ.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-14" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">14. Локализация персональных данных</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>14.1. При сборе данных граждан РФ Оператор обеспечивает их хранение и обработку с использованием баз данных на территории России.</p>
                  <p>14.2. Использование иностранных сервисов не отменяет обязательств по локализации персональных данных в соответствии с законом.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-15" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">15. Файлы cookie и технические данные</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>15.1–15.3. Сайт использует cookie для корректной работы, безопасности и удобства пользователя. Конкретный состав данных зависит от используемых технологий.</p>
                  <p>15.4. При использовании аналитических и рекламных cookie Оператор обеспечивает информирование пользователя в соответствии с законом.</p>
                  <p>15.5. Пользователь может управлять настройками cookie в браузере, однако их отключение может повлиять на работу сайта.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-16" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">16. Использование ИИ и цифровых технологий</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>16.1–16.2. Оператор использует ИИ и цифровые сервисы для анализа, разработки и оптимизации деятельности. Само по себе это не является основанием для обработки персональных данных.</p>
                  <p>16.3. Передача данных в ИИ-сервисы проводится только после оценки необходимости, объема данных, места их хранения и условий конфиденциальности.</p>
                  <p>16.4. Оператор применяет принцип минимизации данных и использует обезличенную информацию, когда это возможно.</p>
                  <p>16.5. Порядок работы с ИИ-технологиями регулируется внутренним регламентом Оператора.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-17" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">17. Меры по обеспечению безопасности</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>Оператор принимает правовые, организационные и технические меры для защиты данных от несанкционированного доступа, изменения или уничтожения.</p>
                  <p>Ключевые меры включают:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Назначение ответственного и принятие локальных регламентов;</li>
                    <li>Ограничение доступа и защита учетных записей паролями;</li>
                    <li>Использование актуального ПО и контроль информационных систем;</li>
                    <li>Оценка рисков новых сервисов и анализ инцидентов безопасности;</li>
                    <li>Своевременное уничтожение или обезличивание данных.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-18" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">18. Права субъекта персональных данных</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>Субъект персональных данных имеет права, предусмотренные законодательством РФ:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Право на получение информации об обработке данных;</li>
                    <li>Требование уточнения, блокирования или уничтожения данных;</li>
                    <li>Отзыв согласия на обработку и получение рекламы;</li>
                    <li>Требование прекращения обработки при наличии оснований;</li>
                    <li>Обжалование действий Оператора в уполномоченный орган или суд.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-19" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">19. Порядок направления обращений</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>19.1. По вопросам обработки данных обращайтесь на email: <strong>5071772@gmail.com</strong></p>
                  <p>19.2. Письменное обращение: <strong>143909, Московская область, г. Балашиха, Московский б-р, д. 1/13, кв. 215.</strong></p>
                  <p>19.3. Обращение должно содержать сведения для идентификации заявителя и суть запроса.</p>
                  <p>19.4. Ответы направляются в сроки, установленные законодательством РФ.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-20" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">20. Отзыв согласия</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>20.1–20.2. Субъект вправе отозвать согласие через email: <strong>5071772@gmail.com</strong> или почтовый адрес.</p>
                  <p>20.3. После отзыва Оператор прекращает обработку, если нет иных законных оснований для ее продолжения.</p>
                  <p>20.4. Уничтожение данных проводится в установленные законом сроки.</p>
                  <p>20.5. Отказ от рекламы не отменяет обработку данных для исполнения договоров или требований закона.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-21" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">21. Уточнение, блокирование и уничтожение</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>21.1. Оператор уточняет данные при их неполноте или неточности.</p>
                  <p>21.2. При выявлении неправомерной обработки данные блокируются на время проверки.</p>
                  <p>21.3. При достижении целей данные уничтожаются или обезличиваются, если законом не предусмотрено иное.</p>
                  <p>21.4. Уничтожение подтверждается в установленном законом порядке.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-22" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">22. Уведомление уполномоченного органа</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>22.1–22.2. Оператор оценивает обязанность и направляет уведомление об обработке данных в Роскомнадзор в соответствии со ст. 22 ФЗ-152, когда это обязательно.</p>
                  <p>22.3. Трансграничная передача рассматривается отдельно с соблюдением требований ст. 12 ФЗ-152 и уведомлением регулятора.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-23" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">23. Внутренний контроль</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>23.1. Оператор самостоятельно осуществляет контроль за соблюдением требований законодательства РФ о персональных данных.</p>
                  <p>23.2. Контроль включает проверку соответствия целей обработки, достаточности данных, наличия законных оснований, соблюдения сроков, правил передачи (в т.ч. трансграничной), использования ИИ и мер защиты.</p>
                  <p>23.3. При выявлении нарушений Оператор принимает меры по их устранению.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-24" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">24. Изменение настоящей Политики</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>24.1. Оператор вправе вносить изменения в Политику при изменении законодательства, деятельности, сервисов или технологий обработки данных.</p>
                  <p>24.2. Новая редакция вступает в силу с момента размещения на сайте, если иное не указано в документе.</p>
                  <p>24.3. Актуальная редакция всегда доступна по адресу: <a href="https://auto-prestige-alchemy.relaxdev.ru/" className="text-primary hover:underline">https://auto-prestige-alchemy.relaxdev.ru/</a></p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="section-25" className="border border-border bg-graphite-deep/30 px-6 rounded-sm">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg font-display text-foreground">25. Заключительные положения</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p>25.1. Настоящая Политика действует бессрочно до ее замены новой редакцией.</p>
                  <p>25.2. Во всем, что не урегулировано Политикой, Оператор руководствуется законодательством РФ.</p>
                  <p>25.3. Обращения принимаются по email: <strong>5071772@gmail.com</strong> или по адресу: 143909, Московская область, г. Балашиха, Московский б-р, д. 1/13, кв. 215.</p>
                </AccordionContent>
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
