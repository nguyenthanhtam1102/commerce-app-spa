import { useContext, useMemo, useState } from "react";

import NavbarItem from "./navbar-item/NavbarItem";
import {
    NAVIGATION_TYPE_HORIZONTAL,
    VERTICAL_NAVBAR_APPEARANCE_LIGHTER,
    VERTICAL_NAVBAR_APPEARANCE_DARKER,
} from "../../constants/Constants";

import "./NavbarVertical.scss";
import clsx from "clsx";
import { ThemeContext } from "../../themes/ThemeContext";

const NavbarVertical = (props) => {
    const { menuData } = props;

    const { theme, handleSwitchTheme } = useContext(ThemeContext);

    const navbarVerticalOpen = useMemo(
        () => !(localStorage.getItem("navbar-vertical-open") === "false"),
        []
    );

    const [open, setOpen] = useState(navbarVerticalOpen);

    const handleOpen = (open) => {
        setOpen(open);
        localStorage.setItem("navbar-vertical-open", open);
    };

    return (
        <div
            className={clsx(
                { "w-60": open },
                { "w-16": !open },
                { hidden: theme.navigationType === NAVIGATION_TYPE_HORIZONTAL },
                {
                    "dark-theme":
                        theme.verticalNavbarAppearance ===
                        VERTICAL_NAVBAR_APPEARANCE_DARKER,
                },
                {
                    "lighter-theme":
                        theme.verticalNavbarAppearance ===
                        VERTICAL_NAVBAR_APPEARANCE_LIGHTER,
                },
                "navbar-vertical h-screen pt-14 ease-in-out duration-300 flex flex-col"
            )}
        >
            <div className="navbar-collapse flex-1 z-0">
                <ul className="pt-6">
                    {menuData.map((item, index) => (
                        <NavbarItem
                            key={index}
                            navbarOpen={open}
                            menuData={item}
                        />
                    ))}
                </ul>
            </div>
            <div
                className={clsx("navbar-vertical-toggle flex items-center", {
                    "justify-center": !open,
                })}
                onClick={() => handleOpen(!open)}
            >
                <i
                    className={clsx(
                        "fa-regular fa-arrow-right-long-to-line",
                        "ease-in-out duration-300 m-5",
                        { "rotate-180": open }
                    )}
                ></i>
                {open && <label className="text-sm">Collapse view</label>}
            </div>
        </div>
    );
};

export default NavbarVertical;
