import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import './global.scss'
import './assets/iconfont/iconfont.css'

const app = createApp(App)
app.provide('allowIps', ['113.110.202.201'])

app.use(Quasar, quasarUserOptions).use(store).use(router).mount('#app')
