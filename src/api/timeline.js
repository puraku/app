import { request } from './base';

export function getPlurks(options) {
  return request('GET', '/APP/Timeline/getPlurks', options);
}
