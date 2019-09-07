import Vuex from 'vuex'
import Vue from 'vue'
import * as types from '@/store/types'
import { login } from '@/api/admin'
import {
  setToken,
  removeToken,
  setUsername,
  removeUsername,
  setLoginType,
  removeLoginType,
} from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    username: null,
    loginType: null,
  },
  getters: {
    username: state => state.username,
    loginType: state => state.loginType,
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      setToken(data.token)
      setUsername(data.username)
      setLoginType(data.loginType)
      state.token = data.token
      state.username = data.username
      state.loginType = data.loginType
    },
    [types.LOGOUT]: state => {
      removeToken()
      removeUsername()
      removeLoginType()
      state.token = null
      state.username = null
      state.loginType = null
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const res = response.data
            if (res.token) {
              commit(types.LOGIN, {
                token: res.token,
                username: res.username,
                loginType: res.type,
              })
            }
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    Logout({ commit }) {
      return new Promise(resolve => {
        commit(types.LOGOUT)
        resolve()
      })
    },
  },
})
