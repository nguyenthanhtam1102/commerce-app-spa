import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserPage from './components/pages/user/UserPage';
import HomePage from './components/pages/user/home-page/HomePage';
import ProductFilters  from './components/pages/user/product-filters/ProductFilters';
import ProductDetails from './components/pages/user/product-details/ProductDetails';
import CartPage from './components/pages/user/cart-page/CartPage';

import AdminPage from './components/pages/admin/AdminPage';
import ProductManager from './components/pages/admin/product-manager/ProductManager';
import ProductPage from './components/pages/admin/product-manager/product-page/ProductPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { ThemeContext } from "./themes/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/Constants";

function App() {
    const {theme} =  useContext(ThemeContext);

    return (
        <div className={`App
            ${theme.colorTheme === LIGHT_THEME && 'light-theme'}
            ${theme.colorTheme === DARK_THEME && 'dark-theme'}
        `}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserPage />}>
                        <Route index element={<HomePage />} />
                        <Route path="/product-filters" element={<ProductFilters />}/>
                        <Route path="/products/:id" element={<ProductDetails />}/>
                        <Route path="/cart" element={<CartPage />} />
                    </Route>
                    <Route path="/admin" element={<AdminPage />}>
                        <Route path="/admin/products" element={<ProductManager />}/>
                        <Route path="/admin/products/:id" element={<ProductPage />}/>
                        <Route path="/admin/products/add" element={<ProductPage />}/>
                    </Route>
                </Routes>
            </BrowserRouter>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
