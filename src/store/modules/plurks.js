import * as types from '../mutation-types';

const state = {
  // { [plurk_id]: PlurkObject }
  plurks: {},

  // { [user_id]: [PlurkObject, PlurkObject] }
  timeline: {}
};

const mutations = {
  [types.FETCH_PLURKS] (state, { plurks }) {
    const newPlurks = plurks.reduce((prev, cur) => {
      return { ...prev, [cur.plurk_id]: cur };
    }, {});

    state.plurks = { ...state.plurks, ...newPlurks };
  },

  [types.PREPEND_TIMELINE] (state, { plurk_ids }, rootState) {
  }
};

export default {
  state,
  mutations
};
