// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import Cesium from 'cesium/Cesium'
import ElementUI from 'element-ui'
import '@/assets/css/global.css'

//cesium引入
Vue.prototype.Cesium = Cesium
require( 'cesium/Widgets/widgets.css')
require('cesium/Assets/Textures/pin.svg')
//elementUi引入
require( 'element-ui/lib/theme-chalk/index.css')
Vue.use(ElementUI)

//axios引入
Vue.prototype.$axios = axios;


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
