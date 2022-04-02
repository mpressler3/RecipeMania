import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import ReviewersList from '../views/Reviewers.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'RecipeHome',
        component: Home
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin
    },
    {
        path: '/reviewers',
        name: 'Reviewers',
        component: ReviewersList
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router