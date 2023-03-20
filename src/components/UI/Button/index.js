import styled from "styled-components";


const ButtonStyled = styled.button`
    border: none;
    color: white;
    padding: 12px 30px;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    border-radius: 20px;
    font-size: 20px;
    background-color: ${({ disabled }) => disabled ? "grey" : "dodgerblue"};
    opacity: ${({ disabled }) => disabled ? "0.5" : "1"};
    &:hover {
        background-color: ${({ disabled }) => disabled ? "grey" : "RoyalBlue"};
    }
`

const Index = ({ children, onClick, disabled }) => {

    return (
        <ButtonStyled onClick={onClick} disabled={disabled}>
            {children}
        </ButtonStyled>

    )
}

export default Index