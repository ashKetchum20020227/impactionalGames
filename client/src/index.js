import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AuthContextProvider} from "./context/AuthContext"
import { ThemeContextProvider } from './context/ThemeContext';
import { ClientThemeContextProvider } from './context/ClientThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ClientThemeContextProvider>
        <ThemeContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </ThemeContextProvider>
    </ClientThemeContextProvider>
);