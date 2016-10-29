import { ipcRenderer } from 'electron';

export function request(method, endpoint, params = null) {
  return new Promise((resolve, reject) => {
    const randomSeed = performance.now();
    ipcRenderer.send('puraku:api', { method, endpoint, params, randomSeed });

    ipcRenderer.once(`puraku:api:${endpoint}:${randomSeed}`, (event, result) => {
      if (result.hasOwnProperty('error')) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}
