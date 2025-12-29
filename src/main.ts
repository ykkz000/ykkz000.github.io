import './assets/main.css'

import {createApp} from 'vue'
import ElementPlus from 'element-plus';
import App from '@/App.vue'
import router from '@/router'
import localeZhCn from 'element-plus/es/locale/lang/zh-cn';

import 'element-plus/dist/index.css';
import {createPinia} from "pinia";

createApp(App)
    .use(ElementPlus, {locale: localeZhCn})
    .use(createPinia())
    .use(router)
    .mount('#app')
