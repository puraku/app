import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import plurks from './modules/plurks';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  modules: {
    plurks
  },
  strict: debug,
});
