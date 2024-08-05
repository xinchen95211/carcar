import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/dist/index.css'

let elementApp = createApp(App);

elementApp
    .use(router)
    .use(ElementPlus)
    .mount('#app');
