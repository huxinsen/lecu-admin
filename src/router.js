import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import * as types from '@/store/types'
import { getToken, getUsername } from '@/utils/auth'
import Login from '@/views/Login'
import Layout from '@/views/layout/Layout'
import ShopList from '@/views/layout/ShopList'
import ReportList from '@/views/layout/ReportList'
import InfoSearch from '@/views/layout/InfoSearch'
import NotFound from '@/views/404'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: '登录',
    component: Login,
    hidden: true,
  },
  {
    path: '/',
    name: '审核管理',
    component: Layout,
    iconClass: 'el-icon-s-check',
    meta: {
      requireAuth: true,
    },
    redirect: '/newshoplist',
    children: [
      {
        path: '/newshoplist',
        component: ShopList,
        name: '店铺申请',
      },
      {
        path: '/reportlist',
        component: ReportList,
        name: '举报列表',
      },
    ],
  },
  {
    path: '/',
    name: '信息查询',
    component: Layout,
    iconClass: 'el-icon-search',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '/search',
        component: InfoSearch,
        name: '店铺查询',
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/404',
        name: '找不到页面',
        component: NotFound,
      },
    ],
  },
  { path: '*', redirect: '/404', hidden: true },
]

const router = new Router({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else if (getToken() && getUsername()) {
      store.commit(types.LOGIN, { token: getToken(), username: getUsername() })
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  } else {
    next()
  }
})

export default router
