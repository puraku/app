import * as types from './mutation-types';

import { getPlurks, getPlurk } from 'api/timeline';
import { getResponses } from 'api/responses';
import { getPublicProfile } from 'api/profile';
import { getMe } from 'api/users';
import { currentUserTimeline } from 'store/getters';

import config from 'utils/config';

import { ipcRenderer } from 'electron';
import moment from 'moment-timezone';

export const initializeApp = ({ dispatch, commit }) => {
  config.get('config:theme').then(theme => {
    theme = theme || 'light';
    config.set('config:theme', theme).then(() => {
      commit({
        type: types.SET_THEME,
        theme
      });
    });
  });

  dispatch('registerIpcActions');
};

/* dispatch vuex action from main process */
export const registerIpcActions = ({ dispatch }) => {
  ipcRenderer.on('vuex:action', (event, arg) => {
    const { action, args } = arg;
    if (Array.isArray(args)) {
      dispatch(...[action, ...args]);
    } else {
      dispatch(action, args);
    }
  });
};

export const toggleStyle = ({ state, commit }) => {
  const theme = state.appTheme;
  const newTheme = theme === 'light' ? 'dark' : 'light';
  config.set('config:theme', newTheme).then(() => {
    commit({
      type: types.SET_THEME,
      theme: newTheme
    });
  });
};

export const fetchTimelinePlurks = async ({ dispatch, state, commit }) => {
  const currentPlurkIds = currentUserTimeline(state).map(p => p.plurk_id);

  try {
    const { plurk_users, plurks } = await getPlurks();

    dispatch('mergePlurks', plurks);
    dispatch('mergeUsers', plurk_users);

    commit({
      type: types.REPLACE_TIMELINE,
      plurkIds: plurks.map(plurk => plurk.plurk_id),
      userID: state.selectedUserId
    });

    plurks.map(plurk => {
      if (plurk.replurker_id) {
        dispatch('fetchUser', plurk.owner_id);
      }
    });
  } catch (error) {
    // TODO: show error dialog
    commit({
      type: types.REPLACE_TIMELINE,
      plurkIds: currentPlurkIds,
      userID: state.selectedUserId
    });
  }
};

export const fetchTimelineNextPage = async ({ commit, state, dispatch }, callback) => {
  const timelinePlurks = currentUserTimeline(state);
  const offset = moment.tz(timelinePlurks[timelinePlurks.length - 1].posted, 'UTC').format('YYYY-M-DTHH:mm:ss');

  const { plurk_users, plurks } = await getPlurks({ offset });

  dispatch('mergePlurks', plurks);
  dispatch('mergeUsers', plurk_users);

  commit({
    type: types.APPEND_TIMELINE,
    plurkIds: plurks.map(p => p.plurk_id),
    userID: state.selectedUserId
  });

  callback();
};

export const mergePlurks = ({ commit }, plurks) => {
  commit({
    type: types.MERGE_PLURKS,
    plurks
  });
};

export const mergeUsers = ({ commit }, users) => {
  commit({
    type: types.MERGE_USERS,
    users
  });
};

export const fetchPlurk = async ({ commit, dispatch }, plurkID) => {
  try {
    const { plurk, user, plurk_users: users } = await getPlurk(plurkID);

    dispatch('mergePlurks', [plurk]);
    dispatch('mergeUsers', users);
    dispatch('mergeUsers', { [user.id]: user });
  } catch (err) { /* TODO */ }
};

export const fetchPlurkResponses = async ({ state, commit, dispatch }, plurkId) => {
  const { friends: users, response_count, responses_seen, responses } = await getResponses(plurkId);

  commit({
    type: types.ADD_RESPONSES,
    responses
  });

  const currentResponseIds = state.plurks.plurkResponses[plurkId];
  let appendIds = responses.map(response => response.id);
  if (typeof currentResponseIds !== 'undefined') {
    appendIds = appendIds.filter(id => {
      return currentResponseIds.indexOf(id) === -1;
    });
  }
  commit({
    type: types.ADD_PLURK_RESPONSES,
    responseIds: appendIds,
    plurkId
  });

  dispatch('mergeUsers', users);
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

export const fetchUser = async ({ commit, dispatch }, userID) => {
  const { plurks, user_info, ...data } = await getPublicProfile(userID);

  dispatch('mergeUsers', { [userID]: user_info });
};

export const fetchUserProfile = async ({ state, commit, dispatch }, userID) => {
  const { plurks, user_info, ...data } = await getPublicProfile(userID);

  commit({
    type: types.FETCH_USER_DATA,
    data
  });

  dispatch('mergePlurks', plurks);

  plurks.map(plurk => {
    if (plurk.replurker_id) {
      dispatch('fetchUser', plurk.owner_id);
    }
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

  dispatch('mergeUsers', { [userID]: user_info });

  commit({
    type: types.CHANGE_HEADER,
    header: user_info.display_name || user_info.nick_name
  });
};
