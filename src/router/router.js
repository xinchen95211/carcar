import {createRouter, createWebHashHistory} from 'vue-router'

import main from '../view/main.vue'
const router = createRouter({
    history:createWebHashHistory(),
    routes: [
        {
            path:'/',
            component: main,
        },
    ]
})
export default router
