import { createContext, useState, useMemo } from "react";
import {
    LANGUAGE_ENGLISH,
    LANGUAGE_VIETNAMESE
} from '../constants/Constants';
import i18n from "./i18n";

export const TranslateContext = createContext()

const TranslateProvider = ({children}) => {
    const currentLanguage = useMemo(() => {
        let currentLanguage = localStorage.getItem('language');
        switch(currentLanguage) {
          case LANGUAGE_VIETNAMESE:
          case LANGUAGE_ENGLISH:
            break;
          default:
            currentLanguage = i18n.defaultLocale;
        }
        return currentLanguage;
    }, []);

    const [language, setLanguage] = useState(currentLanguage);
    i18n.locale = language;

    const handleChangeLanguege = (language) => {
        localStorage.setItem('language', language);
        setLanguage(language);
    }
    
    return (
        <TranslateContext.Provider value={{language, handleChangeLanguege}}>
            {children}
        </TranslateContext.Provider>
    )
}

export default TranslateProvider;