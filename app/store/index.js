import Vue from 'vue'
import Vuex from 'vuex'
import { fetchStoreList } from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        storeList: []
    },

    actions: {
        FETCH_STORE_LIST: ({ commit, state }) => {
            return fetchStoreList()
                        .then(storeList => commit('SET_STORE_LIST', { storeList }))
        }
    },

    mutations: {
        SET_STORE_LIST: (state, { storeList }) => {
            state.storeList = storeList
        }
    },

    getters: {
        storeList(state) {
            return state.storeList
        }
    }
})

export default store
