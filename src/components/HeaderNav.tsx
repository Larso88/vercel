import {NavLink} from "react-router-dom";
import styled from "styled-components";
import React, {useState} from "react";
import {useBreakpointContext} from "../context/BreakpointContext.tsx";

const StyledHeaderLink = styled(NavLink)`
  color: #f1f1f1;
  
  &:hover {
    color: red
  }
`
const StyledHeaderLinkWrapper = styled.div`
    font-size: 1.5rem;
    display: flex;
    justify-content: end;
    flex: 6;
    gap: 7rem;
  
  @media (max-width: 768px) {
    justify-content: right;
    ;
  }
`

export const HeaderNav: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isMobile, isTablet, isDesktop } = useBreakpointContext();
    return (
        <StyledHeaderLinkWrapper>


            {(isDesktop || isTablet) && (
                <>
                    <StyledHeaderLink to="/">Home</StyledHeaderLink>
                    <StyledHeaderLink to="/about">About</StyledHeaderLink>
                    <StyledHeaderLink to="/shoppingList">Shopping List</StyledHeaderLink>
                    <StyledHeaderLink to="/games">Games</StyledHeaderLink>
                </>
            )}
        </StyledHeaderLinkWrapper>
    );
}

export default HeaderNav
