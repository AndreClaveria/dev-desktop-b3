import styled from "styled-components";

const ThumbnailImage = styled.img`
    padding-top: 10px;
    width: 500px;
    height: auto;
    object-fit: contain;
    image-rendering: auto;
`
const Index = ({thumbnailUrl}) => {
    return (
        <ThumbnailImage src={thumbnailUrl} alt="Thumbnail"/>
    )
   
};

export default Index;