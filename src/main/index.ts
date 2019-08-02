import { app, BrowserWindow } from "electron";

const isDev = process.env.NODE_ENV === "development";
let mainWindow: BrowserWindow | null = null;

const createWindow = (): BrowserWindow => {
  const opts: Electron.BrowserWindowConstructorOptions = {
    width: 800,
    height: 640,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: isDev ? false : true
    }
  };

  const win = new BrowserWindow(opts);

  if (isDev) {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  } else {
    win.loadFile("build/index.html");
  }

  win.once("ready-to-show", (): void => win.show());
  win.once(
    "closed",
    (): void => {
      mainWindow = null;
    }
  );

  return win;
};

app.once(
  "ready",
  (): void => {
    mainWindow = createWindow();
  }
);

app.once(
  "window-all-closed",
  (): void => {
    if (process.platform !== "darwin") app.quit();
  }
);

app.on(
  "activate",
  (): void => {
    if (mainWindow === null) {
      mainWindow = createWindow();
    }
  }
);
