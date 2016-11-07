import { request } from './base';

export function getPlurks (options = {}) {
  return request('GET', '/APP/Polling/getPlurks', options);
}

export function getUnreadCount (options = {}) {
  return request('GET', '/APP/Polling/getUnreadCount', options);
}
