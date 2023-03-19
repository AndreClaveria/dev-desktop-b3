
import Header from "../../components/partials/Header";
import Input from "../../components/UI/Input"

import React from 'react';

// const CenterDiv = styled.div`
//   padding-top: 15%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;

// `
const Index = () => {

  function handleDownloadVideo(videoUrl) {
    console.log("video : ",videoUrl)
    window.downloadVideo(videoUrl)
      .then(() => console.log('Download successful!'))
      .catch((err) => console.error('Error downloading video:', err));
  }

  return (
    <>
      <Header/>
      <Input onDownload={handleDownloadVideo}/>
    </>
  
  );
}

export default Index; 
