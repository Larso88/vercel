import {Link} from "react-router-dom";
import styled from "styled-components";
import React, {useState} from "react";
import {useBreakpointContext} from "../context/BreakpointContext.tsx";

const StyledHeaderLink = styled(Link)`
  color: #f1f1f1;
  
  &:hover {
    color: red
  }
`
const StyledHeaderLinkWrapper = styled.div`
    font-size: 1.8rem;
    display: flex;
    flex: 6;
    gap: 7rem;
  
  @media (max-width: 768px) {
    justify-content: right;
    ;
  }
`
const StyledHamburgerButton = styled.button`
  display: none;
  border: none;
  
  @media (max-width: 768px) {
    color: #fff;
    font-size: 1.5rem;
    display: block;
    background: hotpink;
    width: 40px;
    height: 40px;
  }
`;


export const HeaderNav: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isMobile, isTablet, isDesktop } = useBreakpointContext();
    return (
        <StyledHeaderLinkWrapper className="Test1">


            {(isDesktop || isTablet) && (
                <>
                    <StyledHeaderLink to="/">Home</StyledHeaderLink>
                    <StyledHeaderLink to="/about">About</StyledHeaderLink>
                    <StyledHeaderLink to="/shoppingList">Shopping List</StyledHeaderLink>
                </>
            )}
            { (isMobile || isTablet) ? <StyledHamburgerButton className="test" onClick={() => setMenuOpen(!menuOpen)}>☰</StyledHamburgerButton> : null }
        </StyledHeaderLinkWrapper>
    );
}

export default HeaderNav
