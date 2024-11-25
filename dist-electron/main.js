"use strict";
const electron = require("electron");
electron.app.whenReady().then(() => {
  const win = new electron.BrowserWindow({
    show: true,
    transparent: true,
    frame: false,
    center: true,
    hasShadow: false,
    movable: false,
    alwaysOnTop: false,
    focusable: true,
    webPreferences: {
      sandbox: true,
      webviewTag: true
    }
  });
  win.maximize();
  win.show();
  win.setFocusable(true);
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
  setInterval(() => {
    const point = electron.screen.getCursorScreenPoint();
    const [x, y] = win.getPosition();
    const [w, h] = win.getSize();
    if (point.x > x && point.x < x + w && point.y > y && point.y < y + h) {
      updateIgnoreMouseEvents(point.x - x, point.y - y);
    }
  }, 300);
  const updateIgnoreMouseEvents = async (x, y) => {
    const image = await win.webContents.capturePage({
      x,
      y,
      width: 1,
      height: 1
    });
    var buffer = image.getBitmap();
    win.setIgnoreMouseEvents(!buffer[3]);
  };
});
