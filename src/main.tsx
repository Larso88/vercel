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
import styled from "styled-components";

const StyledAppShell = styled.div`
    min-height: 100vh;
    background: linear-gradient(180deg, #0e0e0e, #121212);
    padding-bottom: 90px; 
`;

const StyledPageWrapper = styled.main`
    position: relative;
    isolation: isolate; 
    padding-top: 8px;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: -30px;
        height: 260px;
        pointer-events: none;
        z-index: 0;

        background:
                radial-gradient(
                        200px 100px at 50% 0%,
                        rgba(255, 214, 120, 0.35),
                        rgba(212, 175, 55, 0.22) 35%,
                        rgba(212, 175, 55, 0.10) 55%,
                        rgba(212, 175, 55, 0.00) 72%
                ),
                radial-gradient(
                        980px 420px at 50% 25%,
                        rgba(212, 175, 55, 0.14),
                        transparent 70%
                ),
                linear-gradient(
                        to bottom,
                        rgba(0,0,0,0.65),
                        rgba(0,0,0,0.15) 55%,
                        transparent
                );

        filter: blur(18px);
        mix-blend-mode: screen;
        opacity: 1;
    }

    &::after {
        content: "";
        position: absolute;
        left: 8%;
        right: 8%;
        top: 0;           
        height: 2px;
        pointer-events: none;
        z-index: 0;

        background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 214, 120, 0.85),
                rgba(212, 175, 55, 0.85),
                rgba(255, 214, 120, 0.85),
                transparent
        );

        box-shadow:
                0 0 14px rgba(212, 175, 55, 0.35),
                0 10px 40px rgba(212, 175, 55, 0.18);

        opacity: 0.9;
    }

    > * {
        position: relative;
        z-index: 1;
    }
`;



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
                    <StyledAppShell>
                        <Header />
                        <StyledPageWrapper>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/shoppingList" element={<ShoppingList />} />
                                <Route path="/games" element={<Games />} />
                            </Routes>
                        </StyledPageWrapper>
                        <MobileNavWrapper />
                    </StyledAppShell>
                </BrowserRouter>
            </AuthProvider>
        </BreakpointProvider>
    </StrictMode>
);
