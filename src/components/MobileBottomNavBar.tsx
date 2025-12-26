import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Home, Info, ShoppingCart, Gamepad2 } from "lucide-react";
import colors from "../assets/colors.ts";

const BottomNav = styled.nav`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    isolation: isolate;
    overflow: hidden;
    padding-bottom: env(safe-area-inset-bottom);
    width: 100%;
    height: 72px;
    background: linear-gradient(
            to top,
            rgba(18, 18, 18, 0.98),
            rgba(22, 22, 22, 0.98)
    );
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.35);
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    z-index: 199;
    
    &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: min(520px, 120vw);
        height: 2px;
        background: linear-gradient(
                to right,
                rgba(212, 175, 55, 0),
                rgba(212, 175, 55, 0.55),
                rgba(212, 175, 55, 0)
        );
        pointer-events: none;
        z-index: 1;
    }

    a {
        position: relative;
        z-index: 2;
        flex: 1;
        min-width: 0;
        height: 100%;
        text-decoration: none;
        color: ${colors.light};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        letter-spacing: 0.2px;
        opacity: 0.65;
        transition: opacity 0.25s ease, color 0.25s ease, background 0.25s ease;

        -webkit-tap-highlight-color: transparent;

        svg {
            width: 26px;
            height: 26px;
            transition: transform 0.25s ease, color 0.25s ease, filter 0.25s ease;
        }

        span {
            transition: opacity 0.2s ease;
        }

        &:not(.active) span {
            opacity: 0.45;
        }

        &.active {
            opacity: 1;
            color: ${colors.offset};
            background: linear-gradient(
                    to top,
                    rgba(255, 255, 255, 0.04),
                    rgba(255, 255, 255, 0)
            );

            svg {
                transform: translateY(-2px) scale(1.05);
                color: rgba(212, 175, 55, 1);
                filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.28));
            }

            span {
                font-weight: 600;
                opacity: 1;
            }
        }
    }
`;

export const MobileBottomNav = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "active" : undefined;

    const exact = { end: true } as const;

    return (
        <BottomNav>
            <NavLink to="/" className={linkClass} {...exact}>
                <Home />
                <span>Hjem</span>
            </NavLink>

            <NavLink to="/about" className={linkClass}>
                <Info />
                <span>Om Appen</span>
            </NavLink>

            <NavLink to="/shoppingList" className={linkClass}>
                <ShoppingCart />
                <span>Lister</span>
            </NavLink>

            <NavLink to="/games" className={linkClass}>
                <Gamepad2 />
                <span>Spill</span>
            </NavLink>
        </BottomNav>
    );
};
