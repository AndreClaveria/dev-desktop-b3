
import Header from "../../components/partials/Header";
import Input from "../../components/UI/Input"

const Index = () => {
  

  function handleDownloadVideo(videoUrl) {
    console.log("video : ",videoUrl)
    window.downloadVideo(videoUrl)
      .then(() => console.log('Download successful!'))
      .catch((err) => console.log(err));
    
  }

  return (
    <>
      <Header/>
      <Input onDownload={handleDownloadVideo}/>
    </>
  
  );
}

export default Index; 
