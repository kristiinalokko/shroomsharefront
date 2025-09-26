import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LocationView from "@/views/LocationView.vue";
import LocationInfoView from "@/views/LocationInfoView.vue";
import ShroomInfoView from "@/views/ShroomInfoView.vue";
import LocationsView from "@/views/LocationsView.vue";
import ErrorView from "@/views/ErrorView.vue";
import ProfileView from "@/views/ProfileView.vue";
import ShroomView from "@/views/ShroomView.vue";

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
        path: '/shroom-info',
        name: 'shroomInfo',
        component: ShroomInfoView
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
    {
        path: '/profile',
        name: 'ProfileView',
        component: ProfileView
    },
    {
        path: '/shroom',
        name: 'ShroomView',
        component: ShroomView
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
