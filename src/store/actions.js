import * as types from './mutation-types';
import { getPlurks } from 'api/timeline';
import { getMe } from 'api/users';

export const fetchTimelinePlurks = ({ state, commit }) => {
  getPlurks().then(({ plurk_users, plurks }) => {
    commit({
      type: types.FETCH_PLURKS,
      plurks
    });

    commit({
      type: types.PREPEND_TIMELINE,
      plurkIds: plurks.map(plurk => plurk.plurk_id),
      userID: state.selectedUserId
    });

    commit({
      type: types.FETCH_USERS,
      users: plurk_users
    });
  });
};

export const fetchUserInfo = ({ commit }) => {
  getMe().then(user => {
    commit({
      type: types.LOGIN_USER,
      user
    });

    commit({
      type: types.REGISTER_USER_ID,
      userID: user.id
    });

    // TODO: multi-account
    commit({
      type: types.SELECT_USER_ID,
      userID: user.id
    });
  });
};
