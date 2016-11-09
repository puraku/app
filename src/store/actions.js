import * as types from './mutation-types';

import { getPlurks, getPlurk, getPublicPlurks, getUnreadPlurks, markAsRead } from 'api/timeline';
import * as Polling from 'api/polling';
import { getResponses } from 'api/responses';
import { getPublicProfile } from 'api/profile';
import { getMe } from 'api/users';
import { currentUserTimeline, currentUserUnread } from 'store/getters';

import { formatOffset } from 'helpers/plurkHelper';

import config from 'utils/config';

import { ipcRenderer } from 'electron';

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

/* Timeline Actions */
export const fetchTimelinePlurks = async ({ dispatch, state, commit }, { options, callback }) => {
  const { filter, unread } = state.route.query;

  let timelineMethod, replaceMutationType, plurksGetter;
  if (typeof unread !== 'undefined' && unread === 'true') {
    // fetch unread
    timelineMethod = getUnreadPlurks;
    replaceMutationType = types.REPLACE_UNREAD;
    plurksGetter = currentUserUnread;
  } else {
    timelineMethod = getPlurks;
    replaceMutationType = types.REPLACE_TIMELINE;
    plurksGetter = currentUserTimeline;
  }

  const currentPlurkIds = plurksGetter(state).map(p => p.plurk_id);

  try {
    const { plurk_users, plurks } = await timelineMethod({ filter, ...options });

    dispatch('mergePlurks', plurks);
    dispatch('mergeUsers', plurk_users);

    // NOTE: the 'all' filter params should act the same as when there's no filter params
    commit({
      type: replaceMutationType,
      plurkIds: plurks.map(plurk => plurk.plurk_id),
      userID: state.selectedUserId,
      filter: filter || 'all'
    });

    dispatch('fetchReplurkers', plurks);
  } catch (error) {
    // TODO: show error dialog
    commit({
      type: replaceMutationType,
      plurkIds: currentPlurkIds,
      userID: state.selectedUserId,
      filter: filter || 'all'
    });
  }

  callback();
};

export const clearTimelinePlurks = ({ commit, state }) => {
  const { filter, unread } = state.route.query;
  let mutationType;
  if (typeof unread !== 'undefined' && unread === 'true') {
    mutationType = types.REPLACE_UNREAD;
  } else {
    mutationType = types.REPLACE_TIMELINE;
  }

  commit({
    type: mutationType,
    plurkIds: [],
    userID: state.selectedUserId,
    filter
  });
};

export const fetchTimelineNextPage = async ({ commit, state, dispatch }, { options, callback }) => {
  const { filter, unread } = state.route.query;

  let timelineMethod, replaceMutationType, plurksGetter;
  if (typeof unread !== 'undefined' && unread === 'true') {
    // fetch unread
    timelineMethod = getUnreadPlurks;
    replaceMutationType = types.APPEND_UNREAD;
    plurksGetter = currentUserUnread;
  } else {
    timelineMethod = getPlurks;
    replaceMutationType = types.APPEND_TIMELINE;
    plurksGetter = currentUserTimeline;
  }

  const timelinePlurks = plurksGetter(state);
  const offset = formatOffset(timelinePlurks[timelinePlurks.length - 1]);

  const { plurk_users, plurks } = await timelineMethod({ offset, filter, ...options });

  dispatch('mergePlurks', plurks);
  dispatch('mergeUsers', plurk_users);

  commit({
    type: replaceMutationType,
    plurkIds: plurks.map(p => p.plurk_id),
    userID: state.selectedUserId,
    filter: filter || 'all'
  });

  dispatch('fetchReplurkers', plurks);

  callback();
};

export const fetchUnreadCount = async ({ commit }) => {
  const unreadData = await Polling.getUnreadCount();

  commit({
    type: types.FETCH_UNREAD_DATA,
    unreadData
  });
};

export const fetchReplurkers = ({ dispatch }, plurks) => {
  plurks.map(plurk => {
    if (plurk.replurker_id) {
      dispatch('fetchUser', plurk.owner_id);
    }
  });
};

export const markReadTimelinePlurks = async ({ commit, state }) => {
  const currentUnreadPlurks = currentUserUnread(state);
  const { success_text } = await markAsRead(currentUnreadPlurks.map(plurk => plurk.plurk_id));

  const { filter, unread } = state.route.query;

  if (success_text === 'ok') {
    if (unread === 'true') {
      commit({
        type: types.REPLACE_UNREAD,
        plurkIds: [],
        userID: state.selectedUserId,
        filter: filter || 'all'
      });
    } else {
      // TODO: handle error, display badge or something
    }
  } else {
    // TODO: handle error
  }
};

export const registerPolling = ({ commit, state, dispatch }) => {
  if (!state.timerID) {
    const repeatActions = () => {
      dispatch('pollTimeline');
      dispatch('fetchUnreadCount');
    };

    const timerID = setInterval(repeatActions, 15000);

    repeatActions();

    commit({
      type: types.SET_TIMER_ID,
      timerID
    });
  }
};

export const unregisterPolling = ({ commit, state }) => {
  if (state.timerID) {
    clearInterval(state.timerID);

    commit({
      type: types.SET_TIMER_ID,
      timerID: null
    });
  }
};

export const pollTimeline = async ({ commit, state, dispatch }) => {
  const timelinePlurks = currentUserTimeline(state);

  if (typeof timelinePlurks[0] === 'undefined') { return; }

  const offset = formatOffset(timelinePlurks[0]);

  const { plurk_users, plurks } = await Polling.getPlurks({ offset });

  dispatch('mergePlurks', plurks);
  dispatch('mergeUsers', plurk_users);

  commit({
    type: types.PREPEND_TIMELINE,
    plurkIds: plurks.map(p => p.plurk_id),
    userID: state.selectedUserId,
    filter: 'all'
  });

  dispatch('fetchReplurkers', plurks);
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

export const fetchUserData = ({ commit }, { userID, data }) => {
  commit({
    type: types.FETCH_USER_DATA,
    userID,
    data
  });
};

export const fetchUserProfile = async ({ state, commit, dispatch }, userID) => {
  const { plurks, user_info, ...data } = await getPublicProfile(userID);

  dispatch('fetchUserData', { data, userID });
  dispatch('mergePlurks', plurks);
  dispatch('fetchReplurkers', plurks);
  dispatch('mergeUsers', { [userID]: user_info });

  commit({
    type: types.REPLACE_USER_PLURKS,
    plurkIds: plurks.map(plurk => plurk.plurk_id),
    userID
  });

  commit({
    type: types.CHANGE_HEADER,
    header: user_info.display_name || user_info.nick_name
  });
};

export const fetchUserPlurksNextPage = async ({ state, commit, dispatch }, { userID, callback }) => {
  const userPlurks = state.plurks.userPlurks[userID].map(plurkID => state.plurks.plurks[plurkID]);
  const offset = formatOffset(userPlurks[userPlurks.length - 1]);

  const { plurks, plurk_users } = await getPublicPlurks(userID, { offset });

  dispatch('mergePlurks', plurks);
  dispatch('fetchReplurkers', plurks);
  dispatch('mergeUsers', plurk_users);

  commit({
    type: types.APPEND_USER_PLURKS,
    plurkIds: plurks.map(plurk => plurk.plurk_id),
    userID
  });

  callback();
};
