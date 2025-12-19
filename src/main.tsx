import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Header from "./components/Header";
import About from "./pages/About";
import ShoppingList from "./pages/ShoppingList";

import { BreakpointProvider, useBreakpointContext } from "./context/BreakpointContext";
import { MobileBottomNav } from "./components/MobileBottomNavBar";
import { AuthProvider } from "./auth/AuthProvider";

if (import.meta.env.PROD && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js");
    });
}

const MobileNavWrapper = () => {
    const { isMobile } = useBreakpointContext();
    return isMobile ? <MobileBottomNav /> : null;
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BreakpointProvider>
            <AuthProvider>
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
            </AuthProvider>
        </BreakpointProvider>
    </StrictMode>
);
