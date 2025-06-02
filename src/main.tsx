import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import Home from './pages/Home.tsx';
import Games from './pages/Games.tsx';
import Header from "./components/Header.tsx";
import About from "./pages/About.tsx";
import ShoppingList from "./pages/ShoppingList.tsx";
import {BreakpointProvider, useBreakpointContext} from './context/BreakpointContext.tsx';
import {MobileBottomNav} from "./components/MobileBottomNavBar.tsx";
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
const MobileNavWrapper = () => {
    const { isMobile } = useBreakpointContext();
    if (!isMobile) return null;
    return <MobileBottomNav />;
};



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BreakpointProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shoppingList" element={<ShoppingList />} />
                    <Route path="/games" element={<Games />} />
                </Routes>
                <MobileNavWrapper />
            </BrowserRouter>
        </BreakpointProvider>
    </StrictMode>,
);