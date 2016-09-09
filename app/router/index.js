import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
    mode  : 'history',
    routes: [
        {
            path: '/home',
            component: Home,
        },
        {
            path: '*',
            redirect: '/home'
        }
    ],
    scrollBehavior: () => ({
        y: 0
    }),
})

