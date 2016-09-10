import Vue from 'vue'
import Vuex from 'vuex'
import { fetchStoreList, fetchPhoneData } from '../api'
import moment from 'moment'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        storeList: [],
        phoneData: {}
    },

    actions: {
        FETCH_STORE_LIST: ({ commit, state }) => {
            return fetchStoreList()
                        .then(storeList => commit('SET_STORE_LIST', { storeList }))
        },

        FETCH_PHONE_DATA: ({ commit, state }) => {
            return fetchPhoneData()
                        .then(phoneData => commit('SET_PHONE_DATA', { phoneData }))
        }
    },

    mutations: {
        SET_STORE_LIST: (state, { storeList }) => {
            state.storeList = storeList
        },

        SET_PHONE_DATA: (state, { phoneData }) => {
            state.phoneData = phoneData
        }
    },

    getters: {
        storeList(state) {
            return state.storeList
        },

        phoneData(state) {
            return state.phoneData
        },

        phoneDataLatestUpdateTime(state) {
            return moment(state.phoneData.updated).format("HH:mm:ss")
        },
    }
})

export default store
