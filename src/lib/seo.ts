import { useEffect } from "react";
import { absoluteUrl } from "./site";

/**
 * Заголовок и описание страницы.
 *
 * Сайт рисует страницы в браузере, поэтому заголовок, описание и канонический
 * адрес ставит сам код страницы: у главной они записаны в index.html, у остальных
 * страниц — здесь. Так у каждой машины своя подпись в поиске и в превью
 * мессенджера.
 */

interface SeoInput {
  title: string;
  description: string;
  /** Путь страницы без адреса сайта: /catalog/bmw-x7-40d */
  path: string;
  /** Картинка для превью: адрес или путь от корня сайта */
  image?: string;
}

const DEFAULT_IMAGE = "/og-cover.jpg";

function setMeta(attribute: "name" | "property", key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function useSeo({ title, description, path, image }: SeoInput): void {
  useEffect(() => {
    const url = absoluteUrl(path);
    const picture = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : absoluteUrl(DEFAULT_IMAGE);

    document.title = title;
    setMeta("name", "description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", picture);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", picture);
  }, [title, description, path, image]);
}
