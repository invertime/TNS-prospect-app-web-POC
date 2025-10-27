import { createWebHistory, createRouter } from 'vue-router'

import Home from './routes/Home.vue'
import Login from './routes/Login.vue'
import Register from './routes/Register.vue'
import Dashboard from './routes/Dashboard.vue'
import { SERVER_URL } from './utils/const'
import { user } from './stores/user'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/dashboard', component: Dashboard, beforeEnter: async () => {
            const response = await fetch(SERVER_URL+"/API/user", {
                headers: {'Authorization': user.token ?? ""},
            });
            if (!response.ok){
                user.token = null;
                return "/";
            }
        }},
    ]
})