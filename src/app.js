import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import App from './App.vue';

import { webFrame } from 'electron';

webFrame.setZoomFactor(1);
webFrame.setZoomLevelLimits(1, 1);

new Vue({
  el: '#app',
  render: h => h(App)
});
