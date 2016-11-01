import 'font-awesome/css/font-awesome.css';

import Vue from 'vue';
import { webFrame } from 'electron';

// electron disable pinch zooming
webFrame.setZoomFactor(1);
webFrame.setZoomLevelLimits(1, 1);

new Vue({
  el: '#app',
  template: '<h1>Hello World</h1>'
});
