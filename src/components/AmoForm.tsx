import { useEffect, useRef } from "react";

const FORM_ID = "1737146";
const FORM_HASH = "69729c933f32f7605318fdab731e5827";

export default function AmoForm() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = window as unknown as Record<string, any>;
    w.amo_forms_params = w.amo_forms_params || {
      setMeta: function (p: unknown) {
        this.params = (this.params || []).concat([p]);
      },
    };
    w.amo_forms_load =
      w.amo_forms_load ||
      function (f: unknown) {
        w.amo_forms_load.f = (w.amo_forms_load.f || []).concat([f]);
      };
    w.amo_forms_load({ id: FORM_ID, hash: FORM_HASH, locale: "ru" });
    w.amo_forms_loaded =
      w.amo_forms_loaded ||
      function (f: unknown, k: unknown) {
        w.amo_forms_loaded.f = (w.amo_forms_loaded.f || []).concat([[f, k]]);
      };

    const scriptId = `amoforms_script_${FORM_ID}`;
    if (!document.getElementById(scriptId) && ref.current) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.async = true;
      s.charset = "utf-8";
      s.src = `https://forms.amocrm.ru/forms/assets/js/amoforms.js?${Date.now()}`;
      // amoCRM renders the form right where its script tag lives
      ref.current.appendChild(s);
    }
  }, []);

  return (
    <div className="bg-background border border-border p-6 lg:p-10 shadow-elegant">
      <div className="text-xs uppercase tracking-[0.3em] text-primary">Персональная заявка</div>
      <h3 className="font-display text-3xl mt-4">Свяжусь лично</h3>
      <div ref={ref} className="mt-8" id={`amoforms_container_${FORM_ID}`} />
    </div>
  );
}
