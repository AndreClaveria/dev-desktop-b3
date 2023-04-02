// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('downloadMusic', async (videoUrl) => {
  let result;

  if (videoUrl.startsWith('https://www.youtube.com/playlist?')) {
    result = await ipcRenderer.invoke('download-playlist', videoUrl);
    
  } else {
    const { filePath, thumbnailUrl } = await ipcRenderer.invoke('download-video', videoUrl);
    result = { filePath, thumbnailUrl };
  }

  return result;
});

ipcRenderer.on('download-error', (event, { message }) => {
  // Handle the error message here
  console.log('Download error:', message);
  window.alert(message);
  
});