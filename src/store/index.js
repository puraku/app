import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';

import plurks from './modules/plurks';
import profile from './modules/profile';

// root state and mutations
import root from './root';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    plurks,
    profile
  },
  strict: debug,
  ...root
});
