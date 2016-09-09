import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import store from './store'
import router from './router'

import App from './views/App.vue'

sync(store, router)

const app = new Vue({
    router,
    store,
    ...App
})

app.$mount('#app')
