import { request } from './base';

export function getPublicProfile(user_id, options={}) {
  return request('GET', '/APP/Profile/getPublicProfile', {user_id, ...options});
}
