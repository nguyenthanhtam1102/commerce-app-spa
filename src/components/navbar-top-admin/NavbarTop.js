import { useContext } from "react";

import NavbarItem from "./navbar-item/NavbarItem";
import { ThemeContext } from "../../themes/ThemeContext";
import { TranslateContext } from "../../Translates/TranslateContext";
import i18n from "../../Translates/i18n";
import {
    LIGHT_THEME,
    DARK_THEME,
    NAVIGATION_TYPE_VERTICAL,
    HORIZONTAL_NAVBAR_SHAPE_SLIM,
    HORIZONTAL_NAVBAR_APPEARANCE_LIGHTER,
    HORIZONTAL_NAVBAR_APPEARANCE_DARKER,
    LANGUAGE_ENGLISH,
    LANGUAGE_VIETNAMESE,
} from "../../constants/Constants";

import "./NavbarTop.scss";

const NavbarTop = (props) => {
    const { menuData } = props;

    const themeContext = useContext(ThemeContext);
    const { theme, handleSwitchTheme } = themeContext;

    const translateContext = useContext(TranslateContext);
    const { language, handleChangeLanguege } = translateContext;

    const handleSwitchColorTheme = (colorTheme) => {
        handleSwitchTheme({
            ...theme,
            colorTheme,
        });
    };

    return (
        <nav
            className={`navbar-top fixed shadow-lg grid grid-cols-12 grid-flow-row-dense w-screen content-center px-12
            ${
                theme.horizontalNavbarShape === HORIZONTAL_NAVBAR_SHAPE_SLIM
                    ? "h-fit"
                    : "h-16"
            }
            ${
                theme.horizontalNavbarAppearance ===
                    HORIZONTAL_NAVBAR_APPEARANCE_DARKER && "dark-theme"
            }
            ${
                theme.horizontalNavbarAppearance ===
                    HORIZONTAL_NAVBAR_APPEARANCE_LIGHTER && "lighter-theme"
            }
      `}
        >
            <div className="col-span-6 lg:col-span-2 min-h-fit">
                <a>
                    <div className="flex items-center">
                        <img
                            className="inline-flex w-7"
                            src="	https://prium.github.io/phoenix/v1.11.0/assets/img/icons/logo.png"
                            alt="logo"
                        />
                        <p className={`logo-text ms-2 inline-flex`}>commerce</p>
                    </div>
                </a>
            </div>
            <div className="col-span-12 lg:col-span-8 min-h-fit flex justify-center items-center">
                    {theme.navigationType !== NAVIGATION_TYPE_VERTICAL &&
                        menuData.map((item, index) => (
                            <NavbarItem key={index} menuData={item} />
                        ))
                    }
            </div>
            <div className="col-span-6 lg:col-span-2 justify-self-end min-h-fit">
            <div className="flex items-center">
                <div className="mr-4">
                    <select
                        className="text-xs border-none"
                        onChange={(e) =>
                            handleChangeLanguege(e.target.value)
                        }
                    >
                        <option
                            value={LANGUAGE_VIETNAMESE}
                            selected={i18n.locale === LANGUAGE_VIETNAMESE}
                        >
                            {i18n.t("vietnamese")}
                        </option>
                        <option
                            value={LANGUAGE_ENGLISH}
                            selected={i18n.locale === LANGUAGE_ENGLISH}
                        >
                            {i18n.t("english")}
                        </option>
                    </select>
                </div>
                <div className="flex justify-center items-center mr-5">
                    {theme.colorTheme === LIGHT_THEME && (
                        <button
                            onClick={() =>
                                handleSwitchColorTheme(DARK_THEME)
                            }
                            className="flex justify-center items-center w-9 h-9 text-xl rounded-full bg-orange-300 text-white"
                            style={{
                                color: "#e5780b",
                                backgroundColor:
                                    "rgba(255, 204, 133, 0.24)",
                            }}
                        >
                            <i className="fa-regular fa-sun-bright"></i>
                        </button>
                    )}
                    {theme.colorTheme === DARK_THEME && (
                        <button
                            onClick={() =>
                                handleSwitchColorTheme(LIGHT_THEME)
                            }
                            className="flex justify-center items-center w-9 h-9 text-xl rounded-full bg-orange-300 text-white"
                            style={{
                                color: "#85a9ff",
                                backgroundColor:
                                    "rgba(56, 116, 255, 0.24)",
                            }}
                        >
                            <i className="fa-light fa-moon"></i>
                        </button>
                    )}
                </div>
                <div className="nav-link p-3 text-lg">
                    <i className="fa-regular fa-magnifying-glass"></i>
                </div>
                <div className="nav-link p-3 text-lg">
                    <i className="fa-regular fa-bell"></i>
                </div>
                <div className="nav-link p-3 text-lg">
                    <i className="fa-regular fa-user"></i>
                </div>
            </div>
            </div>
        </nav>
    );
};

export default NavbarTop;
