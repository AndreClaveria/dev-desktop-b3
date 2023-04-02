import styled from "styled-components";

const FilePath = styled.p`
    font-size: 20px;
`

const Index = ({filePath}) => {
    return(
        <FilePath>Your downloaded music is on : {filePath}</FilePath> 
    )
};

export default Index;