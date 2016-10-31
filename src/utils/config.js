import { ipcRenderer } from 'electron';

export default {
  get (key) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('config:get', { key: key });
      ipcRenderer.once(`config:get:${key}`, (event, args) => {
        resolve(args);
      });
    });
  },

  set (key, value) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('config:set', { key: key, value: value });
      ipcRenderer.once(`config:set:${key}`, (event, args) => {
        resolve(args);
      });
    });
  }
};
