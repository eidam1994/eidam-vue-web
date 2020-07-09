import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@views/Login'
import Index from "@views/Index";
import SoftwareCenter from "@views/software/SoftwareCenter";
import ManageCenter from "@views/manage/ManageCenter";
import SoftwareManage from "@views/manage/SoftwareManage";
import UserInfo from "@views/userInfo/UserInfo";
Vue.use(VueRouter)

  const routes = [
      {
          path: '/',
          name: '',
          component: Login,
          meta: {
              requireAuth: false
          }
      }, {
          path: '/login',
          name: '登录',
          component: Login,
          hidden: true,
          meta: {
              requireAuth: false
          }
      }, {
          path: '/index',
          name: '首页',
          component: Index,
          children: [
              {
                  path: '/index/userInfo',
                  name: '个人资料',
                  component: UserInfo,
                  meta: {
                      requireAuth: true
                  }
              },
              {
                  path: '/index/manageCenter',
                  name: '管理中心',
                  component: ManageCenter,
                  children: [
                      {
                          path: '/index/manageCenter/softwareCenter',
                          name: '软件管理',
                          component: SoftwareManage,
                          meta: {
                              requireAuth: true
                          }
                      }
                  ]
              },
              {
                  path: '/index/softwareCenter',
                  name: '软件中心',
                  component: SoftwareCenter,
                  meta: {
                      requireAuth: true
                  }
              }
          ]
      }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
