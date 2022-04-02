import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddRecipe from '../views/AddRecipe.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'RecipeHome',
        component: Home
    },
    {
        path: '/addrecipe',
        name: 'AddRecipe',
        component: AddRecipe
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router