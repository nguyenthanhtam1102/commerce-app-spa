import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import ThemeProvider from "./themes/ThemeContext";
import TranslateProvider from "./Translates/TranslateContext";
import AppProvider from "./contexts/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <AppProvider>
            <ThemeProvider>
                <TranslateProvider>
                    <App/>
                </TranslateProvider>
            </ThemeProvider>
        </AppProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
