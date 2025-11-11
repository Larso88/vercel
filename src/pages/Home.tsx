import styled from "styled-components";
import colors from "../assets/colors.ts";

const StyledHeader = styled.h1`
  font-family: "Academy Engraved LET";
  margin: 2rem;
  color: ${colors.light}
`

export const Home = () => {
  return (
    <>
        <StyledHeader>Hello world!</StyledHeader>
    </>
  );
}

export default Home
