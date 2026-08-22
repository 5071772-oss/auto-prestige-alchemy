import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

const FORM_ID = "1737982";
const FORM_HASH = "020f189ecc866669de0391b48066c721";
const ACTION = "https://forms.amocrm.ru/queue/add";

// Полевые имена берутся из настроек формы amoCRM
const FIELD = {
  name: "fields[name_1]",
  phone: "fields[985603_1][1442081]", // Поменял суффикс с _3 на _1
  email: "fields[985605_1][1442093]",
  note: "fields[note_2]",
};

export default function AmoForm() {
  const [sending, setSending] = useState(false);
  const [note, setNote] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const originRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.split('?')[1] || window.location.search);
    const car = searchParams.get('car');
    if (car) {
      setNote(`Меня заинтересовал автомобиль: ${car}`);
    }
  }, [location]);

  const onSubmit = () => {
    setSending(true);
    if (originRef.current) {
      originRef.current.value = JSON.stringify({
        datetime: new Date().toString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referer: document.referrer,
        from: window.location.href,
      });
    }
    // отправка уходит в скрытый iframe, страница не перезагружается
    window.setTimeout(() => {
      setSending(false);
      formRef.current?.reset();
      toast.success("Заявка отправлена — свяжусь с вами в течение часа");
    }, 900);
  };

  const inputClass = "h-12 rounded-none bg-card border-border";
  const labelClass = "text-xs uppercase tracking-[0.2em] text-muted-foreground";

  return (
    <div className="bg-background border border-border p-6 lg:p-10 shadow-elegant">
      <div className="text-xs uppercase tracking-[0.3em] text-primary">Персональная заявка</div>
      <h3 className="font-display text-3xl mt-4 text-gradient-soft">Свяжусь лично</h3>

      <iframe name="amo_target" title="amo" className="hidden" />

      <form
        ref={formRef}
        action={ACTION}
        method="POST"
        encType="multipart/form-data"
        target="amo_target"
        onSubmit={onSubmit}
        className="mt-8 space-y-5"
      >
        <input type="hidden" name="form_id" value={FORM_ID} />
        <input type="hidden" name="hash" value={FORM_HASH} />
        <input type="hidden" name="user_origin" ref={originRef} />

        <div className="space-y-2">
          <label htmlFor="amo-name" className={labelClass}>Имя</label>
          <Input id="amo-name" name={FIELD.name} required placeholder="Как к вам обращаться" className={inputClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="amo-phone" className={labelClass}>Телефон</label>
          <Input id="amo-phone" name={FIELD.phone} type="tel" required placeholder="+7 (___) ___-__-__" className={inputClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="amo-email" className={labelClass}>Email</label>
          <Input id="amo-email" name={FIELD.email} type="email" placeholder="mail@example.com" className={inputClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="amo-note" className={labelClass}>Комментарий</label>
          <Textarea 
            id="amo-note" 
            name={FIELD.note} 
            rows={4} 
            placeholder="Какой автомобиль вы рассматриваете, бюджет, сроки" 
            className="rounded-none bg-card border-border resize-none"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={sending} className="w-full h-12 rounded-none tracking-[0.2em] uppercase text-xs">
          {sending ? "Отправляю…" : "Отправить заявку"}
        </Button>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
        </p>
      </form>
    </div>
  );
}
