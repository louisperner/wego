"use strict";
const electron = require("electron");
electron.app.whenReady().then(() => {
  const win = new electron.BrowserWindow({
    width: 1024,
    height: 900,
    show: true,
    transparent: false,
    frame: true,
    center: true,
    hasShadow: false,
    movable: true,
    alwaysOnTop: false,
    focusable: true,
    webPreferences: {
      sandbox: true,
      webviewTag: true
    }
  });
  win.show();
  win.setFocusable(true);
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
});
