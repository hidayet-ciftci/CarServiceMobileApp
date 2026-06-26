import React from "react";
import { PaperProvider } from "react-native-paper";
import { registerTranslation } from "react-native-paper-dates";

export default function DateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  registerTranslation("tr", {
    save: "Kaydet",
    selectSingle: "Tarih seç",
    selectMultiple: "Tarihleri seç",
    selectRange: "Aralık seç",
    notAccordingToDateFormat: (inputFormat: string) =>
      `Geçersiz tarih formatı: ${inputFormat}`,
    mustBeHigherThan: (date: string) => `Daha büyük olmalı: ${date}`,
    mustBeLowerThan: (date: string) => `Daha küçük olmalı: ${date}`,
    mustBeBetween: (startDate: string, endDate: string) =>
      `Aralık içinde olmalı: ${startDate} - ${endDate}`,
    dateIsDisabled: "Bu tarih seçilemez",
    previous: "Önceki",
    next: "Sonraki",
    typeInDate: "Tarih gir",
    pickDateFromCalendar: "Takvimden tarih seç",
    close: "Kapat",
    hour: "Saat",
    minute: "Dakika",
  });

  return <PaperProvider>{children}</PaperProvider>;
}
