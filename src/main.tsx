import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import Home from './pages/Home.tsx';
import Header from "./components/Header.tsx";
import ShoppingList from "./pages/ShoppingList.tsx";
import { BreakpointProvider } from './context/BreakpointContext.tsx';
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            },
            error => {
                console.log('Service Worker registration failed:', error);
            }
        );
    });
}


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BreakpointProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<Home />} />
                    <Route path="/games" element={<Home />} />
                    <Route path="/shoppingList" element={<ShoppingList />} />
                </Routes>
            </BrowserRouter>
        </BreakpointProvider>
    </StrictMode>,
);