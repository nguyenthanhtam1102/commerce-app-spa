import { createContext, useState } from "react";

export const TranslateContext = createContext()

const TranslateProvider = ({children}) => {
    const [language, setLanguage] = useState()

    const handleChangeLanguege = (language) => {
        setLanguage(language);
        localStorage.setItem('language');
    }
    
    return (
        <TranslateContext.Provider value={{language, handleChangeLanguege}}>
            {children}
        </TranslateContext.Provider>
    )
}

export default TranslateProvider;