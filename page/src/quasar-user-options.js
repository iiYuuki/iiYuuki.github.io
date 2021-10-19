
import './styles/quasar.scss'
import lang from 'quasar/lang/zh-CN.js'
import { Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    notify: ''
  },
  plugins: {
    Notify
  },
  lang: lang
}
