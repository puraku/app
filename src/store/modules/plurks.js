import * as types from '../mutation-types';

const state = {
  // { [plurk_id]: PlurkObject }
  plurks: {},

  // { [user_id]: [plurk_id, plurk_id] }
  timeline: {},

  // { [other_user_id]: [plurk_id, plurk_id] }
  userPlurks: {}
};

const mutations = {
  [types.FETCH_PLURKS] (state, { plurks }) {
    const newPlurks = plurks.reduce((prev, cur) => {
      return { ...prev, [cur.plurk_id]: cur };
    }, {});

    state.plurks = { ...state.plurks, ...newPlurks };
  },

  [types.PREPEND_TIMELINE] (state, { plurkIds, userID }) {
    const currentPlurkIds = state.timeline[userID] || [];
    state.timeline = {
      ...state.timeline,
      [userID]: [
        ...plurkIds,
        ...currentPlurkIds
      ]
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
  }
};

export default {
  state,
  mutations
};
