import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import echarts from 'echarts'
import VideoPlayer from 'vue-video-player'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import * as THREE from 'three'  在组件内引入
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$echarts = echarts
Vue.use(VideoPlayer);
Vue.use(ElementUI);
// Vue.use(axios)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

