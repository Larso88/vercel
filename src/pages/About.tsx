import styled from "styled-components";
import colors from "../assets/colors.ts";


const StyledHeader = styled.h1`
  font-family: "Academy Engraved LET";
  font-size: 1.5rem;
  margin: 2rem;
`

const StyledP = styled.p`
  font-family: "Academy Engraved LET";
  color: ${colors.platinum};
  font-size: 1.2rem;
  margin: 3rem;
`

export const About = () => {

    return (
        <>
            <StyledHeader>At the moment I`m using this page to learn different technologies</StyledHeader>
                <StyledP>For now the only fun stuff to do here is the shopping list, but hopefully more will be added</StyledP>
        </>
    );
}

export default About