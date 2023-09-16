import { useState } from "react";
import "./NavbarItem.scss";
import clsx from "clsx";

const NavbarItem = (props) => {
    const { name, icon, childs } = props.menuData;

    const { navbarOpen, menuData } = props;
    const [nestedOpen, setNestedOpen] = useState(false);

    const handleClick = () => {
        if (navbarOpen) setNestedOpen(!nestedOpen);
    };

    return (
        <li className="navbar-vertical-item relative">
            <a
                className={`flex rounded-md py-2.5 cursor-pointe text-xs items-center gap-x-4 mx-2 ${
                    !navbarOpen && "justify-center"
                }`}
                onClick={handleClick}
            >
                <i
                    className={clsx(
                        "fa-solid fa-caret-down",
                        "w-2 duration-300 ml-4",
                        `${
                            nestedOpen ? "-rotate-90" : "rotate-0"
                        }`,
                        { hidden: !navbarOpen },
                        {
                            collapse: !(
                                menuData.childs && menuData.childs?.length > 0
                            ),
                        }
                    )}
                ></i>
                {icon}
                <span
                    className={`${
                        !navbarOpen && "hidden"
                    } origin-left duration-200 text-white`}
                >
                    {name}
                </span>
            </a>
            {menuData.childs?.length > 0 && navbarOpen && (
                <ul
                    className={`transition-all ease-in-out overflow-hidden duration-300 ${
                        nestedOpen ? "max-h-96" : "max-h-0"
                    }`}
                >
                    {menuData.childs.map((item, index) => {
                        return (
                            <li key={index} className="nav-item mx-2">
                                <a
                                    className={`flex rounded-md py-2 cursor-pointer text-xs items-center gap-x-4`}
                                >
                                    <i
                                        className={clsx(
                                            "fa-solid fa-caret-down",
                                            "rotate-90 w-2 ml-4",
                                            {"collapse": !(item.childs && item.childs.length > 0)}
                                        )}
                                    ></i>
                                    {item.icon}
                                    {item.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
            {navbarOpen == false && (
                <div className="absolute -top-1 left-14 pl-6 z-50">
                    <div className="navbar-vertical-collapse-menu text-xs w-52 rounded-xl py-2.5 z-50">
                        <ul>
                            <li className="px-4 relative">
                                <label>{name}</label>
                                <div className="navbar-vertical-collapse-menu-arrow w-3 h-3 rounded-sm absolute rotate-45 top-0.5 -left-1.5"></div>
                            </li>

                            {menuData.childs?.length > 0 && (
                                <>
                                    <hr className="h-px my-2.5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                    {menuData.childs.map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className="nav-item py-2 px-4"
                                            >
                                                <a>{item.name}</a>
                                            </li>
                                        );
                                    })}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </li>
    );
};

export default NavbarItem;
