import React, { ChangeEvent, useCallback, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { HvDropDownMenu, HvListValue, HvTooltip } from "@hitachivantara/uikit-react-core";
import usePentahoLocale, { setPentahoLocale } from "./usePentahoLocale";

const localeData = [
  { id: "en", label: "English" },
  { id: "de", label: "Deutsch" },
  { id: "fr", label: "Français" }
];

export default () => {
  const { t} = useTranslation("testing");
  const { locale } = usePentahoLocale();

  useEffect(() => {
    if (locale != null && locale != i18next.language) {
      i18next.changeLanguage(locale)
        .catch((error) => console.error("useEffect - something went wrong:", error));
    }
  }, [locale]);

  const onClick = useCallback((event: ChangeEvent, value: HvListValue) =>
    setPentahoLocale(`${value.id}`), []);

  return (
    <HvTooltip title={t("headerActions.changeLocale")}>
      <HvDropDownMenu dataList={localeData} onClick={onClick} keepOpened={false}/>
    </HvTooltip>
  )
}
