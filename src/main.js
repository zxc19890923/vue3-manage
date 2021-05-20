import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/scss/global.scss'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
