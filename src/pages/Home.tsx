import styled from "styled-components";
import colors from "../assets/colors.ts";
import {useAuth} from "../auth/AuthProvider.tsx";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    align-items: center;
    
`

const StyledHeader = styled.h1`
  font-family: "Academy Engraved LET";
  margin: 2rem;
  color: ${colors.light}
`
const StyledSubtitle = styled.h2`
    font-family: "Academy Engraved LET";
    color: ${colors.light}
`


export const Home = () => {
    const {lastName, firstName} = useAuth()
  return (
    <StyledWrapper>
        <StyledHeader>Hallis {firstName} {lastName}!</StyledHeader>
        <StyledSubtitle>Velkommen innom. Det er ikke så veldig mye gøy her enda, men det jobbes med saken!</StyledSubtitle>
    </StyledWrapper>
  );
}

export default Home
