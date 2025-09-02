import { useState, useEffect } from "react";

export type Language = "gujarati" | "english";

export const translations = {
  gujarati: {
    title: "શિણાય સમૂહલગ્નોત્સવ ૨૦૨૪",
    subtitle: "શ્રી યદુવંશી સોરઠીયા સમાજ શિણાય",
    devotion: "શ્રી કૃષ્ણમ વંદે જગત ગુરૂ",
    events: "શુભ અવસરો",
    couples: "નવ દંપતીઓ",
    venue: "સ્થળ",
    gifts: "દાતાઓ અને ભેટો",
    organizers: "નિમંત્રક",
    contact: "સંપર્ક માહિતી",
    viewInvitation: "આમંત્રણ જુઓ",
    share: "શેર કરો",
    getDirections: "દિશા મેળવો",
    copyLocation: "સ્થાન કોપી કરો",
    mainSponsor: "સમૂહલગ્નોત્સવના દાતા",
    digitalCard: "ડિજિટલ કાર્ડ",
    mainContact: "મુખ્ય સંપર્ક",
    admin: "એડમિન",
    language: "ભાષા",
  },
  english: {
    title: "Shinay Samuhlagnotsav 2024",
    subtitle: "Shri Yaduvanshi Sorathiya Samaj Shinay",
    devotion: "Shri Krishnam Vande Jagat Guru",
    events: "Wedding Events",
    couples: "Nine Blessed Couples",
    venue: "Venue",
    gifts: "Donors & Gifts",
    organizers: "Organizers",
    contact: "Contact Information",
    viewInvitation: "View Invitation",
    share: "Share",
    getDirections: "Get Directions",
    copyLocation: "Copy Location",
    mainSponsor: "Main Sponsors",
    digitalCard: "Digital Card",
    mainContact: "Main Contact",
    admin: "Admin",
    language: "Language",
  },
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("wedding-language") as Language) || "gujarati";
    }
    return "gujarati";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wedding-language", language);
    }
  }, [language]);

  const t = (key: keyof typeof translations.gujarati) => {
    return translations[language][key] || key;
  };

  return { language, setLanguage, t };
}
