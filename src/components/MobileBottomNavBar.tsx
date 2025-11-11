import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Home, Info, ShoppingCart, Gamepad2 } from "lucide-react";
import colors from "../assets/colors.ts";

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: ${colors.lightPrimary};
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 199;

  a {
    text-decoration: none;
    color: ${colors.light};
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

    &.active {
      color: ${colors.offset};
    }

    svg {
      width: 24px;
      height: 24px;
      margin-bottom: 4px;
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
                <span>Home</span>
            </NavLink>

            <NavLink to="/about" className={linkClass}>
                <Info />
                <span>About</span>
            </NavLink>

            <NavLink to="/shoppingList" className={linkClass}>
                <ShoppingCart />
                <span>Shopping</span>
            </NavLink>

            <NavLink to="/games" className={linkClass}>
                <Gamepad2 />
                <span>Games</span>
            </NavLink>
        </BottomNav>
    );
};
