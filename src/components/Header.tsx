import HeaderNav from "./HeaderNav.tsx";
import styled from "styled-components";
import Avatar from "../assets/Avatar.png"
import React from "react";

const StyledHeader = styled.div`
  width: 88%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 5%;
  align-items: center;
  
  @media(max-width: 768px) {
    justify-content: space-between;
    margin: 1rem 0 2rem 0;
  }
`
const StyledLeftContent = styled.div`
  display: flex;
  flex: 1;
`

const StyledAvatar = styled.img`
  width: 130px;
  height: 130px;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
`
const StyledHeaderCenterSection = styled.div`
    font-size: 0.8rem;
    color: red;
    display: flex;
    flex: 4;
  
    @media(max-width: 768px) {
      font-size: 1rem;
    }
`

export const Header: React.FC = () => {
    return (
        <>
            <StyledHeader className="Test">
                <StyledLeftContent>
                    <StyledAvatar src={Avatar} />
                </StyledLeftContent>
                    <StyledHeaderCenterSection>Site is much under construction</StyledHeaderCenterSection>
                <HeaderNav />
            </StyledHeader>
        </>
    );
}

export default Header
