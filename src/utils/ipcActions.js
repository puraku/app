import { ipcRenderer, remote } from 'electron';

export const openCreatePlurkPopoup = () => {
  ipcRenderer.send('postWindow:new');
};

/* Used in create plurk popup */
const mainWindow = () => {
  const winId = ipcRenderer.sendSync('getMainWindowId');
  return remote.BrowserWindow.fromId(winId);
};

export const plurkCreated = (plurkId) => {
  mainWindow().webContents.send('vuex:action', {
    action: 'fetchPlurk',
    args: plurkId
  });
};

export const refreshTimeline = (plurkId) => {
  mainWindow().webContents.send('vuex:action', {
    action: 'fetchTimelinePlurks'
  });
};
