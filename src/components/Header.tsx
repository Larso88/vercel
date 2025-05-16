import HeaderNav from "./HeaderNav.tsx";
import styled from "styled-components";

const StyledHeader = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 5%;
  align-items: center;
  margin: 2rem 0 4rem 0;
`
const StyledLogoSection = styled.div`
  display: flex;
  flex: 2;
`
const StyledHeaderCenterSection = styled.div`
    display: flex;
    flex: 2;
`

export const Header = () => {
    console.log("I mounted Header")
    return (
        <>
            <StyledHeader>
                <StyledLogoSection>Left content</StyledLogoSection>
                <StyledHeaderCenterSection>Central content</StyledHeaderCenterSection>
                <HeaderNav />
            </StyledHeader>
        </>
    );
}

export default Header
