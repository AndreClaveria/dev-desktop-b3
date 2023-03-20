// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('downloadVideo', async (videoUrl) => {
  await ipcRenderer.invoke('download-video', videoUrl);
});



// contextBridge.exposeInMainWorld('ipcRenderer', {
//   on: (channel, listener) => {
//     const allowedChannels = ['download-progress'];

//     if (allowedChannels.includes(channel)) {
//       ipcRenderer.on(channel, listener);
//     }
//   },
//   removeListener: (channel, listener) => {
//     ipcRenderer.removeListener(channel, listener);
//   },
// });

// // Listen for download-progress event and send it to renderer process
// ipcRenderer.on('download-progress', (event, progress) => {
//   window.postMessage({
//     type: 'download-progress',
//     progress,
//   });
// });