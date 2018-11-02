import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueVideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import "font-awesome/css/font-awesome.min.css";
import 'element-ui/lib/theme-chalk/index.css'
import './registerServiceWorker'
import './assets/css/element_reset.css'
import './assets/css/common.css'

import videojs from 'video.js';
window.videojs = videojs;
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueVideoPlayer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
