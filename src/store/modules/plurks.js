import * as types from '../mutation-types';

const state = {
  // { [plurk_id]: PlurkObject }
  plurks: {},

  // { [user_id]: [plurk_id, plurk_id] }
  timeline: {},

  // { [other_user_id]: [plurk_id, plurk_id] }
  userPlurks: {},

  // { [response_id]: ResponseObject }
  responses: {},

  // { [plurk_id]: [ response_id, response_id ] }
  plurkResponses: {}
};

const mutations = {
  [types.MERGE_PLURKS] (state, { plurks }) {
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

  [types.APPEND_TIMELINE] (state, { plurkIds, userID }) {
    const currentPlurkIds = state.timeline[userID] || [];
    state.timeline = {
      ...state.timeline,
      [userID]: [
        ...currentPlurkIds,
        ...plurkIds
      ]
    };
  },

  [types.REPLACE_TIMELINE] (state, { plurkIds, userID }) {
    state.timeline = {
      ...state.timeline,
      [userID]: plurkIds
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
  }
};

export default {
  state,
  mutations
};
