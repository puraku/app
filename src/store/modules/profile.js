import * as types from '../mutation-types';

const state = {
  // { [userid]: userData }
  userData: {}
};

const mutations = {
  [types.FETCH_USER_DATA] (state, { data, userID }) {
    state.userData = {
      ...state.userData,
      [userID]: data
    };
  }
};

export default {
  state,
  mutations
};
