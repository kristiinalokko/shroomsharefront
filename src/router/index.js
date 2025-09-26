import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LocationView from "@/views/LocationView.vue";
import LocationInfoView from "@/views/LocationInfoView.vue";
import ShroomView from "@/views/ShroomView.vue";
import LocationsView from "@/views/LocationsView.vue";
import ErrorView from "@/views/ErrorView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/location',
        name: 'location',
        component: LocationView
    },
    {
        path: '/location-info',
        name: 'locationInfo',
        component: LocationInfoView
    },
    {
        path: '/shroom',
        name: 'shroom',
        component: ShroomView
    },
    {
        path: '/locations',
        name: 'LocationsView',
        component: LocationsView
    },
    {
        path: '/error',
        name: 'ErrorView',
        component: ErrorView
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
