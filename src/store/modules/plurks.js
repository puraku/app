import * as types from '../mutation-types';

const state = {
  // { [plurk_id]: PlurkObject }
  plurks: {},

  // { [user_id]: { all: [plurk_id, plurk_id], my: [plurk_id, plurk_id] } }
  timeline: {},

    // { [user_id]: { all: [plurk_id, plurk_id], my: [plurk_id, plurk_id] } }
  unreadPlurks: {},

  // { [other_user_id]: [plurk_id, plurk_id] }
  userPlurks: {},

  // { [response_id]: ResponseObject }
  responses: {},

  // { [plurk_id]: [ response_id, response_id ] }
  plurkResponses: {},

  // {"all": 2, "my": 1, "private": 1, "responded": 0}
  unreadData: {}
};

const mutations = {
  [types.MERGE_PLURKS] (state, { plurks }) {
    const newPlurks = plurks.reduce((prev, cur) => {
      return { ...prev, [cur.plurk_id]: cur };
    }, {});

    state.plurks = { ...state.plurks, ...newPlurks };
  },

  [types.PREPEND_TIMELINE] (state, { plurkIds, userID, filter }) {
    const currentPlurkIds = state.timeline[userID] && state.timeline[userID][filter] || [];
    state.timeline = {
      ...state.timeline,
      [userID]: {
        ...state.timeline[userID],
        [filter]: [
          ...plurkIds,
          ...currentPlurkIds
        ]
      }
    };
  },

  [types.APPEND_TIMELINE] (state, { plurkIds, userID, filter }) {
    const currentPlurkIds = state.timeline[userID] && state.timeline[userID][filter] || [];
    state.timeline = {
      ...state.timeline,
      [userID]: {
        ...state.timeline[userID],
        [filter]: [
          ...currentPlurkIds,
          ...plurkIds
        ]
      }
    };
  },

  [types.REPLACE_TIMELINE] (state, { plurkIds, userID, filter }) {
    const currentUserTimeline = state.timeline[userID] || {};
    state.timeline = {
      ...state.timeline,
      [userID]: {
        ...currentUserTimeline,
        [filter]: plurkIds
      }
    };
  },

  [types.APPEND_UNREAD] (state, { plurkIds, userID, filter }) {
    const currentPlurkIds = state.unreadPlurks[userID] && state.unreadPlurks[userID][filter] || [];
    state.unreadPlurks = {
      ...state.unreadPlurks,
      [userID]: {
        ...state.unreadPlurks[userID],
        [filter]: [
          ...currentPlurkIds,
          ...plurkIds
        ]
      }
    };
  },

  [types.REPLACE_UNREAD] (state, { plurkIds, userID, filter }) {
    const currentUserUnreadPlurks = state.unreadPlurks[userID] || {};
    state.unreadPlurks = {
      ...state.unreadPlurks,
      [userID]: {
        ...currentUserUnreadPlurks,
        [filter]: plurkIds
      }
    };
  },

  [types.PREPEND_USER_PLURKS] (state, { plurkIds, userID }) {
    const currentPlurkIds = state.userPlurks[userID] || [];
    state.userPlurks = {
      ...state.userPlurks,
      [userID]: [
        ...plurkIds,
        ...currentPlurkIds
      ]
    };
  },

  [types.APPEND_USER_PLURKS] (state, { plurkIds, userID }) {
    const currentPlurkIds = state.userPlurks[userID] || [];
    state.userPlurks = {
      ...state.userPlurks,
      [userID]: [
        ...currentPlurkIds,
        ...plurkIds
      ]
    };
  },

  [types.REPLACE_USER_PLURKS] (state, { plurkIds, userID }) {
    state.userPlurks = {
      ...state.userPlurks,
      [userID]: plurkIds
    };
  },

  [types.ADD_RESPONSES] (state, { responses }) {
    state.responses = {
      ...state.responses,
      ...responses.reduce((prev, cur) => {
        return { ...prev, [cur.id]: cur };
      }, {})
    };
  },

  [types.ADD_PLURK_RESPONSES] (state, { responseIds, plurkId }) {
    const currentResponseIds = state.plurkResponses[plurkId] || [];
    state.plurkResponses = {
      [plurkId]: [
        ...currentResponseIds,
        ...responseIds
      ]
    };
  },

  [types.FETCH_UNREAD_DATA] (state, { unreadData }) {
    state.unreadData = unreadData;
  }
};

export default {
  state,
  mutations
};
