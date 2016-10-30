import * as types from './mutation-types';
import { getPlurks } from 'api/timeline';
import { getPublicProfile } from 'api/profile';
import { getMe } from 'api/users';

export const fetchTimelinePlurks = ({ state, commit }) => {
  getPlurks().then(({ plurk_users, plurks }) => {
    commit({
      type: types.FETCH_PLURKS,
      plurks
    });

    const currentPlurkIds = state.plurks.timeline[state.selectedUserId];
    let prependIds = plurks.map(plurk => plurk.plurk_id);
    if (typeof currentPlurkIds !== 'undefined') {
      prependIds = prependIds.filter(id => {
        return currentPlurkIds.indexOf(id) === -1;
      });
    }

    commit({
      type: types.PREPEND_TIMELINE,
      plurkIds: prependIds,
      userID: state.selectedUserId
    });

    commit({
      type: types.FETCH_USERS,
      users: plurk_users
    });
  });
};

export const loadUser = ({ commit }) => {
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

export const changeHeader = ({ commit }, header) => {
  commit({
    type: types.CHANGE_HEADER,
    header: header
  });
};

export const fetchUserProfile = ({ state, commit }, userID) => {
  getPublicProfile(userID).then(({ plurks, user_info, ...data }) => {
    commit({
      type: types.FETCH_USER_DATA,
      data
    });

    commit({
      type: types.FETCH_PLURKS,
      plurks
    });

    const currentPlurkIds = state.plurks.userPlurks[userID];
    let prependIds = plurks.map(plurk => plurk.plurk_id);
    if (typeof currentPlurkIds !== 'undefined') {
      prependIds = prependIds.filter(id => {
        return currentPlurkIds.indexOf(id) === -1;
      });
    }
    commit({
      type: types.PREPEND_USER_PLURKS,
      plurkIds: prependIds,
      userID
    });

    commit({
      type: types.FETCH_USERS,
      users: {
        [userID]: user_info
      }
    });

    commit({
      type: types.CHANGE_HEADER,
      header: user_info.display_name || user_info.nick_name
    });
  });
};
