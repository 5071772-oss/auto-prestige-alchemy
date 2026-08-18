
import React, { useEffect } from 'react';

const AmoForm = () => {
  useEffect(() => {
    // Remove any existing script to avoid duplicates
    const existingScript = document.getElementById('amoforms_script_1737982');
    if (existingScript) {
      existingScript.remove();
    }

    // Initialize the amo_forms object
    window.amo_forms_params = window.amo_forms_params || [];
    window.amo_forms_load = window.amo_forms_load || function(f) {
      (window.amo_forms_load.f = window.amo_forms_load.f || []).push(f);
    };
    
    window.amo_forms_load({
      id: "1737982",
      hash: "020f189ecc866669de0391b48066c721",
      locale: "ru"
    });

    // Create and append the script
    const script = document.createElement('script');
    script.id = 'amoforms_script_1737982';
    script.async = true;
    script.charset = 'utf-8';
    script.src = 'https://forms.amocrm.ru/forms/assets/js/amoforms.js?1787045086';
    document.body.appendChild(script);

    return () => {
      // Cleanup if necessary, though amoCRM forms usually inject an iframe
      const scriptToRemove = document.getElementById('amoforms_script_1737982');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);

  return (
    <div className="amo-form-container w-full min-h-[400px] bg-background border border-border rounded-lg overflow-hidden">
      <div id="amoforms_1737982"></div>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Attempt to blend the iframe if possible, though amoCRM controls its styles */
        .amo-form-container iframe {
          width: 100% !important;
          background: transparent !important;
        }
      `}} />
    </div>
  );
};

export default AmoForm;

declare global {
  interface Window {
    amo_forms_params: any[];
    amo_forms_load: any;
    amo_forms_loaded: any;
  }
}
