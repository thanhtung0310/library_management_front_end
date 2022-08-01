import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vueAxios from 'vue-axios'
import i18n from './i18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faCircleInfo, faBan, faMagnifyingGlass, faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons'
// import {} from '@fortawesome/free-regular-svg-icons'
import {faFacebook, faTwitter, faInstagram, faYoutube, faGoogle} from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(faCircleInfo, faBan, faMagnifyingGlass, faFacebook, faTwitter, faInstagram, faYoutube, faGlobe, faGoogle, faTrashCan)

const app = createApp(App).use(store)
app.use(i18n)
app.use(store)
app.use(router, axios, vueAxios)
app.use(ElementPlus)
app.provide('axios', app.config.globalProperties.axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
