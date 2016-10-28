import { request } from './base';

export function getResponses(plurk_id, options={}) {
  return request('GET', '/APP/Responses/get', {plurk_id, ...options});
}

export function addResponse(plurk_id, content, qualifier, options={}) {
  return request(
    'POST',
    '/APP/Responses/responseAdd',
    {
      plurk_id,
      content,
      qualifier,
      ...options
    }
  );
}

export function deleteResponse(response_id, plurk_id) {
  return request('POST', '/APP/Responses/responseDelete', {response_id, plurk_id});
}
