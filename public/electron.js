// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, ipcMain, dialog, protocol, Notification} = require("electron");
const path = require("path");
const url = require("url");
const ytdl = require('ytdl-core');
const fs = require('fs');
const ytpl = require('ytpl');

// Create the native browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  //For playlist
  ipcMain.handle('download-playlist', async (e, playlistUrl) => {
    try {
      const playlistInfo = await ytpl(playlistUrl);
      const videos = playlistInfo.items;
      const notifications = [];
  
      for (const video of videos) {
        const videoUrl = video.shortUrl;
        const info = await ytdl.getInfo(videoUrl);
        const durationSeconds = info.videoDetails.lengthSeconds;
  
        if (durationSeconds > 1500) {
          mainWindow.webContents.send('download-error', { message: `Video duration exceeds 25 minutes: ${videoUrl}` });
          continue;
        }
  
        const formats = ytdl.filterFormats(info.formats, 'audioonly');
        const fileFormat = formats[0];
        const fileName = info.videoDetails.title.replace(/[/\s\?%*:|"<>]/g, '') + '.mp3';
  
        const stream = ytdl(videoUrl, {
          format: fileFormat
        });
  
        const defaultPath = app.getPath('music');
        const savePath = `${defaultPath}/${fileName}`;
        
        const notification = {
          title: 'Download complete!',
          body: fileName,
          icon: path.join(__dirname, 'logo192.png'),
        };
  
        stream.pipe(fs.createWriteStream(savePath)).on('finish', () => {
          notifications.push(notification);
          if (notifications.length === videos.length) {
            new Notification({
              title: 'All downloads complete!',
              body: 'Your YouTube playlist has been downloaded and converted to MP3',
              icon: path.join(__dirname, 'logo192.png'),
            }).show();
          }
        });
       
      }
      
    } catch (error) {
      mainWindow.webContents.send('download-error', { message: error.message });
    }
  });

  //For one video only
  ipcMain.handle('download-video', async (e, videoUrl) => {
    try {
      const info = await ytdl.getInfo(videoUrl);
    const durationSeconds = info.videoDetails.lengthSeconds;
    if (durationSeconds > 1500) {
      mainWindow.webContents.send('download-error', { message: `Video duration exceeds 25 minutes` });
      return;
    }
    const formats = ytdl.filterFormats(info.formats, 'audioonly');
    
    const fileFormat = formats[0];
    const fileName = info.videoDetails.title.replace(/[/\s\?%*:|"<>]/g, '') + '.mp3';

    const stream = ytdl(videoUrl, {
      format: fileFormat
    });
   
    
    const defaultPath = app.getPath('music');
    const saveResult = await dialog.showSaveDialog({
      defaultPath: `${defaultPath}/${fileName}`
    });

    if (saveResult.canceled) {
      return;
    }
  
    const savePath = saveResult.filePath;
    
    const thumbnailUrl = info.videoDetails.thumbnails[0].url;

    const notification = new Notification({
      title: 'Download complete!',
      body: 'Your YouTube video has been downloaded and converted to MP3',
      icon: path.join(__dirname, 'logo192.png'), // replace with your own icon file path
    });
    stream.pipe(fs.createWriteStream(savePath)).on('finish', () => {
      notification.show();
   
      mainWindow.webContents.send('download-complete', { thumbnailUrl });
    });
    return { thumbnailUrl, filePath: savePath };
    } catch (error) {
      mainWindow.webContents.send('download-error', { message: error.message });
    }
    
  });


  mainWindow.loadFile('index.html');

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";
  mainWindow.loadURL(appURL);

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}


// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = "https://my-electron-app.com";
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.