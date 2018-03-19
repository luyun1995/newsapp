// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'animate.css'
import './assets/css/style.css'
import router from './router'
// 加上vuex
import store from './store/index.js'

Vue.config.productionTip = false

Vue.use(MintUI)

Vue.filter("minutes", function (value) {
  //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  return (Math.floor(value / 60) + ":" + Math.floor(value % 60));
});

Vue.filter('time', function (value) {
  return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 加上vuex
  store,
  render: h => h(App)
})
