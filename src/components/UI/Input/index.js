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

`;


const Label = styled.label`
    flex-direction: column;
`;

const Index = ({ onDownload }) => {
    
  const [videoUrl, setVideoUrl] = useState('');
    
  const handleDownload = async () => {
    console.log(videoUrl);
    await onDownload(videoUrl);

  };
  
    return (
        <>
            <Label htmlFor="video-url">Enter YouTube video URL</Label>
            <InputBar
                type="text"
                id="video_url"
                placeholder="https://www.youtube.com/watch?v="
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                
            />
            
            <Button onClick={handleDownload}>Download</Button>
        </>
    );
};

export default Index;
