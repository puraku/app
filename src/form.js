import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import { webFrame } from 'electron';
import Form from './Form.vue';

// electron disable pinch zooming
webFrame.setZoomFactor(1);
webFrame.setZoomLevelLimits(1, 1);

new Vue({
  el: '#app',
  render: h => h(Form)
});
