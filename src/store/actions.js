import * as types from './mutation-types';
import { getPlurks } from 'api/timeline';

export const fetchTimelinePlurks = ({ commit }) => {
  getPlurks().then(({ plurk_users, plurks }) => {
    commit({
      type: types.FETCH_PLURKS,
      plurks
    });
  });
};
