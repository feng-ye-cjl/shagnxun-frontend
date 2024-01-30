import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
// 导入elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 解决跨域

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 挂载elementPlus
app.use(ElementPlus)

app.mount('#app')
