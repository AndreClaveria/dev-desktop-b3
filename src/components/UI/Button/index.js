import styled from "styled-components";


const ButtonStyled = styled.button`
    border: none;
    color: white;
    padding: 12px 30px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 20px;
    background-color: dodgerblue;
    &:hover {
        background-color: RoyalBlue;
    }
    /* &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    } */
`

const Index = ({ children, onClick}) => {

    return (
        <ButtonStyled onClick={onClick}>
            {children}
        </ButtonStyled>
        
    )
}

export default Index