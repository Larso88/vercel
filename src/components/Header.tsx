import HeaderNav from "./HeaderNav";
import styled from "styled-components";
import Avatar from "../assets/Avatar.png";
import React from "react";
import AppMenuDrawer from "./AppMenuDrawer";

const StyledHeader = styled.div`
    width: 88%;
    display: flex;
    justify-content: space-between;
    padding: 1rem 5%;
    align-items: center;

    @media (max-width: 768px) {
        justify-content: space-between;
        margin: 1rem 0 0 0;
    }
`;

const StyledLeftContent = styled.div`
    display: flex;
    flex: 1;
`;

const StyledAvatar = styled.img`
    width: 130px;
    height: 130px;

    @media (max-width: 768px) {
        width: 90px;
        height: 90px;
    }
`;

const RightSide = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const DesktopOnlyNav = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Header: React.FC = () => {
    return (
        <StyledHeader>
            <StyledLeftContent>
                <StyledAvatar src={Avatar} />
            </StyledLeftContent>

            <RightSide>
                <DesktopOnlyNav>
                    <HeaderNav />
                </DesktopOnlyNav>

                <AppMenuDrawer />
            </RightSide>
        </StyledHeader>
    );
};

export default Header;
