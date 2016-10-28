import { ipcRenderer } from 'electron';

export function request(method, endpoint, params=null) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const result = ipcRenderer.send('puraku:api', {method, endpoint, params, timestamp});

    ipcRenderer.once(`puraku:api:${endpoint}:${timestamp}`, (event, result) => {
      if (result.hasOwnProperty('error')) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}
