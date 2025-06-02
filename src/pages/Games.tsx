import styled from "styled-components";
import colors from "../assets/colors.ts";


const StyledHeader = styled.h1`
  margin: 2rem;
  font-family: "Academy Engraved LET";
  color: ${colors.platinum};
`

export const Games = () => {

    return (
        <>
            <StyledHeader>Here there will be games!</StyledHeader>
        </>
    );
}

export default Games
