import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import { webFrame } from 'electron';

import store from './store';

import App from './App.vue';
import Timeline from 'views/Timeline.vue';
import PlurkDetail from 'views/PlurkDetail.vue';
import About from 'views/About.vue';

Vue.use(VueRouter);

// electron disable pinch zooming
webFrame.setZoomFactor(1);
webFrame.setZoomLevelLimits(1, 1);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        { name: 'timeline', path: '', component: Timeline },
        { name: 'plurkDetail', path: '/plurks/:plurk_id', component: PlurkDetail },
        { name: 'about', path: '/about/:user_id', component: About }
      ]
    }
  ]
});

sync(store, router);

new Vue({
  el: '#app',
  router,
  store
});
