import { useEffect } from "react";

/**
 * Переход по якорю на страницу, которую рисует браузер.
 *
 * Ссылки в меню ведут на главную с якорем — «/#process», «/#about». Когда браузер
 * открывает такой адрес, элемента с этим именем ещё нет: страницу рисует React,
 * и собственная прокрутка браузера до якоря не срабатывает. Поэтому после отрисовки
 * страницы ищем раздел сами и прокручиваем к нему.
 */
export function useHashScroll(): void {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    let attempts = 0;
    let frame = 0;

    const scrollToTarget = () => {
      const target = document.getElementById(hash);
      if (target) {
        // Прокрутка мгновенная: человек только что открыл страницу, а плавный ход
        // от самого верха выглядит как задержка. В стилях задан плавный ход,
        // поэтому на время прокрутки его отключаем.
        const root = document.documentElement;
        const previous = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        target.scrollIntoView({ block: "start" });
        root.style.scrollBehavior = previous;
        return;
      }
      if (attempts++ < 30) frame = requestAnimationFrame(scrollToTarget);
    };

    scrollToTarget();
    return () => cancelAnimationFrame(frame);
  }, []);
}
