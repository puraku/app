import { ipcRenderer } from 'electron';

export const openCreatePlurkPopoup = () => {
  ipcRenderer.send('postWindow:new');
};
