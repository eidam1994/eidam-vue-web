import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [CreatePersistedState()],
    state: {
        userInfo: undefined
    },
    mutations: {
        login(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {},
    modules: {}
})
