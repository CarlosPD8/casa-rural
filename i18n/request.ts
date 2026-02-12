// i18n/request.ts
import {getRequestConfig} from "next-intl/server";
import {notFound} from "next/navigation";

export const locales = ["es", "en", "it", "fr", "pt"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  // En Next recientes, requestLocale puede ser Promise
  const locale = (await requestLocale) as Locale;

  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
