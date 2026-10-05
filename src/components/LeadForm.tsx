import { useRef, useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { submitLead, utmFromLocation } from "@/lib/chatium-leads";

/** Название формы: по нему заявку видно в кабинете заявок. */
const FORM_NAME = "Заявка на консультацию";

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

export default function LeadForm() {
  const [sending, setSending] = useState(false);
  const [note, setNote] = useState("");
  const [model, setModel] = useState("");
  const [personalDataConsent, setPersonalDataConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const setCarNote = (car?: string | null) => {
      if (!car) return;
      setModel(car);
      setNote((current) => (current.trim() ? current : `Меня заинтересовал автомобиль: ${car}`));
    };

    const searchParams = new URLSearchParams(window.location.search);
    setCarNote(searchParams.get("car"));

    const handleCarSelected = (event: Event) => {
      const customEvent = event as CustomEvent<{ car?: string }>;
      setCarNote(customEvent.detail?.car);
    };

    window.addEventListener("car-selected", handleCarSelected);
    return () => window.removeEventListener("car-selected", handleCarSelected);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!personalDataConsent) {
      setErrors({ name: "Для отправки заявки необходимо дать согласие на обработку персональных данных." });
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    // Скрытое поле-ловушка: человек его не видит и не заполняет
    const company = String(data.get("company") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Укажите имя";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Укажите корректный телефон";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Некорректный e-mail";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    const result = await submitLead({
      name,
      phone,
      email: email || undefined,
      message: message || undefined,
      model: model || undefined,
      company: company || undefined,
      pageUrl: window.location.href,
      referrer: document.referrer || undefined,
      formName: FORM_NAME,
      ...utmFromLocation(),
    });
    setSending(false);

    if (!result.ok) {
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.");
      return;
    }

    formRef.current?.reset();
    setNote("");
    setModel("");
    setPersonalDataConsent(false);
    setErrors({});
    toast.success("Заявка отправлена — свяжусь с вами в течение часа");
  };

  const inputClass = "h-12 rounded-none bg-card border-border";
  const labelClass = "text-xs uppercase tracking-[0.2em] text-muted-foreground";

  return (
    <div className="bg-background border border-border p-6 lg:p-10 shadow-elegant">
      <div className="text-xs uppercase tracking-[0.3em] text-primary">Персональная заявка</div>
      <h3 className="font-display text-3xl mt-4 text-gradient-soft">Свяжусь лично</h3>

      <form ref={formRef} onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        {/* Ловушка для роботов: человек этого поля не видит */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="space-y-2">
          <label htmlFor="lead-name" className={labelClass}>Имя</label>
          <Input id="lead-name" name="name" required placeholder="Как к вам обращаться" className={inputClass} />
          {errors.name && <p role="alert" className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="lead-phone" className={labelClass}>Телефон</label>
          <Input id="lead-phone" name="phone" type="tel" required placeholder="+7 (___) ___-__-__" className={inputClass} />
          {errors.phone && <p role="alert" className="text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="lead-email" className={labelClass}>Email</label>
          <Input id="lead-email" name="email" type="email" placeholder="mail@example.com" className={inputClass} />
          {errors.email && <p role="alert" className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="lead-note" className={labelClass}>Комментарий</label>
          <Textarea
            id="lead-note"
            name="message"
            rows={4}
            placeholder="Какой автомобиль вы рассматриваете, бюджет, сроки"
            className="rounded-none bg-card border-border resize-none"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="personal-data-consent"
            name="personal_data_consent_checkbox"
            checked={personalDataConsent}
            onCheckedChange={(checked) => { setPersonalDataConsent(checked === true); setErrors({}); }}
            required
            aria-describedby="personal-data-consent-description"
          />
          <label id="personal-data-consent-description" htmlFor="personal-data-consent" className="text-xs text-muted-foreground leading-relaxed">
            Я даю согласие на обработку моих персональных данных на условиях {" "}
            <a href="/personal-data-consent" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-primary transition-smooth">
              Согласия на обработку персональных данных
            </a>.
          </label>
        </div>
        <Button type="submit" disabled={sending} className="w-full h-12 rounded-none tracking-[0.2em] uppercase text-xs">
          {sending ? "Отправляю…" : "Отправить заявку"}
        </Button>
      </form>
    </div>
  );
}
