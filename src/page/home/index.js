
import Header from "../../components/partials/Header";
import Input from "../../components/UI/Input";
import Thumbnail from "../../components/UI/Image";
import FilePath from "../../components/UI/FilePath"
import styled from "styled-components";
import { useState } from "react";

const CenterDiv = styled.div`
    padding-top: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;


const Index = () => {
  
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [downloadedFilePath, setDownloadedFilePath] = useState(null);
  

  async function handleDownloadVideo(videoUrl) {
    try {
      const { filePath, thumbnailUrl } = await window.downloadMusic(videoUrl);
      setDownloadedFilePath(filePath);
      setThumbnailUrl(thumbnailUrl);
    } catch (error) {
      console.log(error);
    }
   
  }

  return (
    <>
      <Header/>
      
      <CenterDiv>
       
        <Input onDownload={handleDownloadVideo}/>
        {thumbnailUrl && <Thumbnail thumbnailUrl={thumbnailUrl}/>}
        {downloadedFilePath && (
         <FilePath filePath={downloadedFilePath}/>
        )}
      
      </CenterDiv>
     
    </>
  
  );
}

export default Index; 
