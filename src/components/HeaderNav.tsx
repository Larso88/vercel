import { NavLink } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { useBreakpointContext } from "../context/BreakpointContext.tsx";
import colors from "../assets/colors.ts";
import {MobileBottomNav} from "./MobileBottomNavBar.tsx";

const StyledHeaderLink = styled(NavLink)`
  color: ${colors.light};
  white-space: nowrap;
  text-decoration: none;
  position: relative; 

  &:hover {
    color: ${colors.offset};
  }

  &.active {
    color: ${colors.offset};
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: -2px; 
    left: 50%; 
    transform: translateX(-50%) scaleX(1); 
    transform-origin: center;
    width: 100%; 
    height: 2px; 
    background-color: ${colors.offset};
    transition: transform 0.2s ease-in-out;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%; 
    transform: translateX(-50%) scaleX(0); 
    transform-origin: center;
    width: 100%;
    height: 2px;
    background-color: ${colors.offset};
    transition: transform 0.2s ease-in-out;
  }
`;

const StyledHeaderLinkWrapper = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: end;
  flex: 6;
  gap: 7rem;
  position: relative; 

  @media (max-width: 768px) {
    justify-content: right;
  }
`;

export const HeaderNav: React.FC = () => {
    const { isMobile, isTablet, isDesktop } = useBreakpointContext();

    return (
        <StyledHeaderLinkWrapper>
            {(isDesktop || isTablet) && (
                <>
                    <StyledHeaderLink to="/">Home</StyledHeaderLink>
                    <StyledHeaderLink to="/about">About</StyledHeaderLink>
                    <StyledHeaderLink to="/shoppingList">
                        Shopping List
                    </StyledHeaderLink>
                    <StyledHeaderLink to="/games">Games</StyledHeaderLink>
                </>
            )}
            {isMobile && (<MobileBottomNav />)}
        </StyledHeaderLinkWrapper>
    );
};

export default HeaderNav;
