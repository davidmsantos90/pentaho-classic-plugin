import i18next from "i18next";
import useSWR from "swr";

export const setPentahoLocale = async (locale: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_HOST}/pentaho/api/system/locale`, {
      method: "POST",
      body: locale
    });

    if (!response.ok) {
      console.error("not ok:", response.statusText);
      return;
    }

    // also update app locale
    await i18next.changeLanguage(locale);
    console.log(`Locale changed successfully to ${locale}`);
  } catch (error) {
    console.error("something went wrong:", error);
  }
}

export const getLocale = async (url: string) => {
  try {
    const locale =  await fetch(url, {cache: "no-cache"}).then((res) => res.text());

    console.log("current pentaho locale:", locale);

    return locale;
  } catch (ex) {
    console.error("error fetching locale:", ex);
  }

  return null;
}

export default () => {
  const {
    data: locale,
    ...others
  } = useSWR(() => `${import.meta.env.VITE_HOST}/pentaho/api/system/locale`, getLocale);

  return { locale, ...others };
}
