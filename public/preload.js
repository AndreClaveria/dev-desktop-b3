// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

contextBridge.exposeInMainWorld('downloadVideo', async (videoUrl) => {
  await ipcRenderer.invoke('download-video', videoUrl);
}); 