// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Routers from './router';
import VueRouter from 'vue-router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Https from './https.js';

// 引入axios，并加到原型链中
import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;
Vue.prototype.https = Https


Vue.$ajax = axios
Vue.use(VueRouter);
Vue.use(ViewUI);



// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter({
  Routers
})
new Vue({
    el: '#app',
    router: Routers,
    render: h => h(App)
});
