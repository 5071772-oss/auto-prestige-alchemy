import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AmoForm() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Заявка отправлена — свяжусь с вами в течение часа");
    }, 600);
  };

  return (
    <div className="bg-background border border-border p-6 lg:p-10 shadow-elegant">
      <div className="text-xs uppercase tracking-[0.3em] text-primary">Персональная заявка</div>
      <h3 className="font-display text-3xl mt-4 text-gradient-soft">Свяжусь лично</h3>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Имя</label>
          <Input id="name" name="name" required placeholder="Как к вам обращаться" className="h-12 rounded-none bg-card border-border" />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Телефон</label>
          <Input id="phone" name="phone" type="tel" required placeholder="+7 (___) ___-__-__" className="h-12 rounded-none bg-card border-border" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</label>
          <Input id="email" name="email" type="email" placeholder="mail@example.com" className="h-12 rounded-none bg-card border-border" />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Комментарий</label>
          <Textarea id="message" name="message" rows={4} placeholder="Какой автомобиль вы рассматриваете, бюджет, сроки" className="rounded-none bg-card border-border resize-none" />
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
