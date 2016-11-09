import { request } from './base';

export function getPlurks (options = {}) {
  return request('GET', '/APP/Timeline/getPlurks', { limit: 20, ...options });
}

export function getUnreadPlurks (options = {}) {
  return request('GET', '/APP/Timeline/getUnreadPlurks', { limit: 20, ...options });
}

export function getPlurk (plurk_id, options = {}) {
  return request('GET', '/APP/Timeline/getPlurk', { plurk_id, ...options });
}

export function getPublicPlurks (user_id, options = {}) {
  return request('GET', '/APP/Timeline/getPublicPlurks', { user_id, ...options });
}

export function addPlurk (content, qualifier, options = {}) {
  return request('GET', '/APP/Timeline/plurkAdd', { content, qualifier, ...options });
}
