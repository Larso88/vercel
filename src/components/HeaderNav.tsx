import {Link} from "react-router-dom";
import styled from "styled-components";

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
`


export const HeaderNav = () => {
    console.log("I mounted HeaderNav")
    return (
        <StyledHeaderLinkWrapper>
            <StyledHeaderLink to="/">Home</StyledHeaderLink>
            <StyledHeaderLink to="/about">About</StyledHeaderLink>
            <StyledHeaderLink to="/shoppingList">Shopping List</StyledHeaderLink>

        </StyledHeaderLinkWrapper>
    );
}

export default HeaderNav
