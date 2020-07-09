import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userInfo: undefined
  },
  mutations: {
      login(state, userInfo) {
          state.userInfo = userInfo
      }
  },
  actions: {
  },
  modules: {
  }
})
