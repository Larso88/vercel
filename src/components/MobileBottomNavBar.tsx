import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Home, Info, ShoppingCart, Gamepad2 } from "lucide-react";
import colors from "../assets/colors.ts";

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: ${colors.platinum};
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 199;

  a {
    text-decoration: none;
    color: #666;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

    &.active {
      color: #007aff;
    }

    svg {
      width: 24px;
      height: 24px;
      margin-bottom: 4px;
    }
  }
`;

export const MobileBottomNav = () => {
    return (
        <BottomNav>
            <NavLink to="/" activeClassName="active">
                <Home />
                <span>Home</span>
            </NavLink>
            <NavLink to="/about" activeClassName="active">
                <Info />
                <span>About</span>
            </NavLink>
            <NavLink to="/shoppingList" activeClassName="active">
                <ShoppingCart />
                <span>Shopping</span>
            </NavLink>
            <NavLink to="/games" activeClassName="active">
                <Gamepad2 />
                <span>Games</span>
            </NavLink>
        </BottomNav>
    );
};
