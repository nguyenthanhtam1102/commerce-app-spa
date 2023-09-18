import { useContext, useState } from "react";
import "./Header.scss";
import { ThemeContext } from "../../themes/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "../../constants/Constants";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const { theme, handleSwitchTheme } = useContext(ThemeContext);

    const handleSwitchColorTheme = (colorTheme) => {
        handleSwitchTheme({
            ...theme,
            colorTheme,
        });
    };

    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();

    const search = () => {
        if(searchText.trim() !== '') {
            navigate(`/product-fitlers?key=${encodeURIComponent(searchText)}`)
        }
    }

    const handleSearchInputKeyPress = (event) => {
        if(event.key === 'Enter') {
            search();
        }
    }

    return (
        <div className="header">
            <div className="container grid grid-cols-10 grid-flow-row-dense py-3 gap-2.5">
                <div className="flex items-center justify-start col-span-6 md:col-span-2">
                    <div className="flex items-center">
                        <img
                            className="w-8 h-8 mr-3"
                            src="https://prium.github.io/phoenix/v1.11.0/assets/img/icons/logo.png"
                            alt=""
                        />
                        <span className="logo-text text-3xl font-semibold">
                            commerce
                        </span>
                    </div>
                </div>
                <div className="flex items-center  justify-center col-span-12 md:col-span-6">
                    <div className="search-box flex w-full md:w-9/12 rounded-full">
                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleSearchInputKeyPress}
                            className="text-sm font-semibold w-full outline-none block p-2.5 ps-6 bg-transparent"
                            placeholder="Search"
                        />
                        <button 
                            className="btn-search inline-flex items-center pe-5 ps-4"
                            onClick={search}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-end col-span-6 md:col-span-2">
                    <div className="flex">
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
                        <div className="nav-link text-xl flex items-center justify-center">
                            <Link 
                                to={'/cart'}
                                className="relative p-3"
                            >
                                <i className="fa-regular fa-bag-shopping"></i>
                                <span className="absolute w-5 h-5 top-0 right-0 text-xs font-semibold bg-blue-500 text-white rounded-full flex items-center justify-center">
                                    0
                                </span>
                            </Link>
                        </div>
                        <div className="nav-link p-3 text-xl">
                            <i className="fa-regular fa-user"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar">
                <div className="container flex py-2.5">
                    <div>
                        <button className="font-semibold">
                            <i className="fa-solid fa-bars mr-2"></i>
                            Category
                        </button>
                    </div>
                    <div className="flex-1">
                        <ul className="flex justify-end gap-9 cursor-pointer">
                            <li>
                                <Link to={'/admin/products'}>Admin</Link>
                            </li>
                            <li>Home</li>
                            <li>
                                <Link to={'/product-fitlers'}>Products</Link>
                            </li>
                            <li>Contact</li>
                            <li>About</li>
                            <li>
                                <div>
                                    More
                                    <i className="fa-solid fa-chevron-down ms-2"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
