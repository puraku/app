import { request } from './base';

export function getMe() {
  return request('GET', '/APP/Users/me');
}
