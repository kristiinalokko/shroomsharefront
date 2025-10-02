import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LocationView from "@/views/LocationView.vue";
import LocationInfoView from "@/views/LocationInfoView.vue";
import ShroomInfoView from "@/views/ShroomInfoView.vue";
import LocationsView from "@/views/LocationsView.vue";
import ErrorView from "@/views/ErrorView.vue";
import ProfileView from "@/views/ProfileView.vue";
import ShroomTableView from "@/views/ShroomTableView.vue";
import LocationTableView from "@/views/LocationTableView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: LocationsView
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
        name: 'locations',
        component: LocationsView
    },
    {
        path: '/error',
        name: 'error',
        component: ErrorView
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    },
    {
        path: '/shroom-table',
        name: 'shroomTable',
        component: ShroomTableView
    },
    {
        path: '/location-table',
        name: 'locationTable',
        component: LocationTableView
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
