import styled from "styled-components";

type Props = {
    name: string
}

const StyledListNameHeaderWrapper = styled.div`
    width: 100%
`

export const ListNameHeader = ({name}: Props) => {

    return (
        <StyledListNameHeaderWrapper>
            <h3>{name}</h3>
        </StyledListNameHeaderWrapper>

    );
};

export default ListNameHeader;