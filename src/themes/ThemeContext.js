import { createContext, useState, useMemo } from "react";
import {
    LIGHT_THEME,
    DARK_THEME,
    NAVIGATION_TYPE_VERTICAL,
    NAVIGATION_TYPE_HORIZONTAL,
    NAVIGATION_TYPE_COMBO,
    VERTICAL_NAVBAR_APPEARANCE_DARKER,
    VERTICAL_NAVBAR_APPEARANCE_DEFAULT,
    VERTICAL_NAVBAR_APPEARANCE_LIGHTER,
    HORIZONTAL_NAVBAR_APPEARANCE_DARKER,
    HORIZONTAL_NAVBAR_APPEARANCE_DEFAULT,
    HORIZONTAL_NAVBAR_APPEARANCE_LIGHTER,
    HORIZONTAL_NAVBAR_SHAPE_DEFAULT,
    HORIZONTAL_NAVBAR_SHAPE_SLIM,
} from '../constants/Constants';

export const ThemeContext = createContext()

const ThemeProvider = ({children}) => {
    const currentTheme = useMemo(() => {
        let currentTheme;
    
        try {
          currentTheme = JSON.parse(localStorage.getItem("theme"));
        } catch (e) {
          currentTheme = {};
        }
    
        switch (currentTheme?.colorTheme) {
          case DARK_THEME:
            currentTheme = {
              ...currentTheme,
              colorTheme: DARK_THEME,
            };
            break;
          default:
            currentTheme = {
              ...currentTheme,
              colorTheme: LIGHT_THEME,
            };
            break;
        }
    
        switch (currentTheme?.navigationType) {
          case NAVIGATION_TYPE_VERTICAL:
            currentTheme = {
              ...currentTheme,
              navigationType: NAVIGATION_TYPE_VERTICAL,
            };
            break;
          case NAVIGATION_TYPE_HORIZONTAL:
            currentTheme = {
              ...currentTheme,
              navigationType: NAVIGATION_TYPE_HORIZONTAL,
            };
            break;
          default:
            currentTheme = {
              ...currentTheme,
              navigationType: NAVIGATION_TYPE_COMBO,
            };
            break;
        }
    
        switch (currentTheme?.verticalNavbarAppearance) {
          case VERTICAL_NAVBAR_APPEARANCE_LIGHTER:
            currentTheme = {
              ...currentTheme,
              verticalNavbarAppearance: VERTICAL_NAVBAR_APPEARANCE_LIGHTER,
            };
            break;
          case VERTICAL_NAVBAR_APPEARANCE_DARKER:
            currentTheme = {
              ...currentTheme,
              verticalNavbarAppearance: VERTICAL_NAVBAR_APPEARANCE_DARKER,
            };
            break;
          default:
            currentTheme = {
              ...currentTheme,
              verticalNavbarAppearance: VERTICAL_NAVBAR_APPEARANCE_DEFAULT,
            };
            break;
        }
    
        switch (currentTheme?.horizontalNavbarShape) {
          case HORIZONTAL_NAVBAR_SHAPE_SLIM:
            currentTheme = {
              ...currentTheme,
              horizontalNavbarShape: HORIZONTAL_NAVBAR_SHAPE_SLIM,
            };
            break;
          default:
            currentTheme = {
              ...currentTheme,
              horizontalNavbarShape: HORIZONTAL_NAVBAR_SHAPE_DEFAULT,
            };
            break;
        }
    
        switch (currentTheme?.horizontalNavbarAppearance) {
          case HORIZONTAL_NAVBAR_APPEARANCE_LIGHTER:
            currentTheme = {
              ...currentTheme,
              horizontalNavbarAppearance: HORIZONTAL_NAVBAR_APPEARANCE_LIGHTER,
            };
            break;
          case HORIZONTAL_NAVBAR_APPEARANCE_DARKER:
            currentTheme = {
              ...currentTheme,
              horizontalNavbarAppearance: HORIZONTAL_NAVBAR_APPEARANCE_DARKER,
            };
            break;
          default:
            currentTheme = {
              ...currentTheme,
              horizontalNavbarAppearance: HORIZONTAL_NAVBAR_APPEARANCE_DEFAULT,
            };
            break;
        }
    
        return currentTheme;
    }, []);
    
    const [theme, setTheme] = useState(currentTheme)

    const handleSwitchTheme = (theme) => {
        setTheme(theme);
        localStorage.setItem("theme", JSON.stringify(theme))
    }

    return (
        <ThemeContext.Provider value={{theme, handleSwitchTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;