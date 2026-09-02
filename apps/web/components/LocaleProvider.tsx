"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  catalogs,
  defaultLocale,
  isLocale,
  localeNames,
  locales,
  localeStorageKey,
  type Locale,
} from "@/lib/i18n";

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue | null>(null);

function translateText(value: string, locale: Locale) {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const content = value.trim().replace(/\s+/g, " ");
  if (!content) return value;

  const dynamicContent = content.startsWith("Open image: ")
    ? content.replace("Open image: ", "")
    : null;
  if (dynamicContent) {
    const translatedAlt = locale === "es" ? catalogs.es[dynamicContent] : dynamicContent;
    if (translatedAlt) return `${leading}${locale === "es" ? "Abrir imagen: " : "Open image: "}${translatedAlt}${trailing}`;
  }

  const english = locale === "en"
    ? Object.entries(catalogs.es).find(([, translated]) => translated === content)?.[0]
    : content;
  const translated = locale === "en" ? english : catalogs[locale][content];
  return translated ? `${leading}${translated}${trailing}` : value;
}

function translateTree(root: ParentNode, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (!node.parentElement?.closest("script, style")) {
      const next = translateText(node.nodeValue ?? "", locale);
      if (next !== node.nodeValue) node.nodeValue = next;
    }
    node = walker.nextNode();
  }

  const elements = root instanceof Element ? [root, ...root.querySelectorAll("*")] : root.querySelectorAll("*");
  for (const element of elements) {
    for (const attribute of ["aria-label", "alt", "placeholder", "title"]) {
      const value = element.getAttribute(attribute);
      if (value) element.setAttribute(attribute, translateText(value, locale));
    }
  }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem(localeStorageKey);
    const browserLocale = navigator.language.split("-")[0];
    setLocaleState(isLocale(saved) ? saved : isLocale(browserLocale) ? browserLocale : defaultLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translateText(document.title, locale);
    translateTree(document.body, locale);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element || node instanceof DocumentFragment) translateTree(node, locale);
          else if (node.nodeType === Node.TEXT_NODE && node.parentNode) translateTree(node.parentNode, locale);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    localStorage.setItem(localeStorageKey, nextLocale);
    setLocaleState(nextLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function LanguageSwitcher({ id = "patio-language" }: { id?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div className="language-switcher">
      <label className="sr-only" htmlFor={id}>Language</label>
      <select
        id={id}
        aria-label="Language"
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        {locales.map((code) => <option key={code} value={code}>{localeNames[code]}</option>)}
      </select>
    </div>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
