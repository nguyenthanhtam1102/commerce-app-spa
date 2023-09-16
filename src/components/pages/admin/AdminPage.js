import { Link, NavLink, Outlet } from "react-router-dom";
import NavbarVertical from "../../navbar-vertical-admin/NavbarVertical";
import NavbarTop from "../../navbar-top-admin/NavbarTop";
import i18n from "../../../Translates/i18n";
import { TranslateContext } from "../../../Translates/TranslateContext";
import { useContext, useMemo } from "react";

const AdminPage = () => {
    const { language } = useContext(TranslateContext);

    const menuData = useMemo(() => {
        return (
            [
                {
                    name: i18n.t("dashboard"),
                    icon: <i className="fa-regular fa-chart-pie"></i>,
                },
                {
                    name: i18n.t("orders"),
                    icon: <i className="fa-regular fa-file-contract"></i>,
                },
                {
                    name: i18n.t("products"),
                    icon: <i className="fa-sharp fa-regular fa-cube"></i>,
                },
                {
                    name: i18n.t("categories"),
                    icon: <i className="fa-light fa-list-dropdown"></i>,
                },
                {
                    name: i18n.t("discounts"),
                    icon: <i className="fa-regular fa-tag"></i>,
                },
                {
                    name: i18n.t("settings"),
                    icon: <i className="fa-regular fa-gear"></i>,
                    childs: [
                        {
                            name: i18n.t("shipping"),
                        },
                        {
                            name: i18n.t("tax"),
                        },
                        {
                            name: i18n.t("billing"),
                        },
                    ],
                },
            ]
        )
    }, [language]);

    return (
        <div>
            <div className="fixed top-0 left-0 z-50">
                <NavbarTop menuData={menuData}/>
            </div>
            <div className="flex">
                <div className="navbar-vertical-container z-40">
                    <NavbarVertical menuData={menuData}/>
                </div>
                <div className="flex-1 p-10 h-screen overflow-auto">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;