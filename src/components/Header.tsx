import HeaderNav from "./HeaderNav.tsx";
import styled from "styled-components";
import {useBreakpointContext} from "../context/BreakpointContext.tsx";
import Avatar from "../assets/Avatar.png"

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
  width: 100px;
  height: 100px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`
const StyledHeaderCenterSection = styled.div`
    display: flex;
    flex: 2;
`

export const Header = () => {
    const { isMobile, isTablet, isDesktop } = useBreakpointContext();
    return (
        <>
            <StyledHeader className="Test">
                <StyledLeftContent>
                    <StyledAvatar src={Avatar} />
                </StyledLeftContent>
                {isDesktop ?? <StyledHeaderCenterSection>Site is much under construction</StyledHeaderCenterSection>}
                <HeaderNav />
            </StyledHeader>
        </>
    );
}

export default Header
