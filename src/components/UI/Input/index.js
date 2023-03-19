import styled from "styled-components";
import Button from "../Button"
import { useState } from "react";
const InputBar = styled.input`
    width: 400px;
    padding: 8px 12px;
    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 15px;
    margin-top: 15px;
    color: black;
    border: 1px solid #b8b8b5;
    border-radius: 4px;
    transition: border-color .5s;
`
const CenterDiv = styled.div`
  padding-top: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`

const Label = styled.label`
    flex-direction: column;
`

const Index = ({ onDownload }) => {
    
    const [videoUrl, setVideoUrl] = useState('');

    const handleButtonClick = () => {
      console.log("onDownload : ", videoUrl)
      onDownload(videoUrl);
    };
  

    return(
      <CenterDiv>
        <Label  htmlFor="video-url">Enter Youtube video URL</Label>
        <InputBar
            type="text"
            id="video_url"
            placeholder="https://www.youtube.com/watch?v="
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
        />
        <Button onClick={handleButtonClick}>Download</Button>
        
      </CenterDiv>
    )
    
}

export default Index