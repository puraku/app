import { ipcRenderer } from 'electron';

export function request(method, endpoint, params=null) {
  return ipcRenderer.sendSync('puraku:api', {method, endpoint, params});
}
