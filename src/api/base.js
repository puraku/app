import { ipcRenderer } from 'electron';

export function request(method, endpoint, params=null) {
  return new Promise((resolve, reject) => {
    const result = ipcRenderer.sendSync('puraku:api', {method, endpoint, params});
    if (result.hasOwnProperty('error')) {
      reject(result);
    } else {
      resolve(result);
    }
  });
}
