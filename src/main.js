// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
// 引入状态管理
import store from './store/index';
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
import axios from 'axios';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

// 使用element UI
Vue.use(ElementUI);
// 过滤器
import * as custom from './utils/util'

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})

// 路由拦截器
router.beforeEach((to, from, next) => {
    if (to.matched.length != 0) {
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            axios.post('/api/isAuth').then(function (response) {
                if (Boolean(response.data.success)) { // 通过vuex state获取当前的user是否存在
                    next();
                } else {
                    next({
                        path: '/login',
                        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    })
                }
            })
        } else {
            next();
        }
    } else {
        next({
            path: '/login',
            query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
