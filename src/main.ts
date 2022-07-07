import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCircleInfo, faBan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import {} from '@fortawesome/free-regular-svg-icons'

import {faFacebook, faTwitter, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'

import i18n from './i18n'

/* add icons to the library */
library.add(faCircleInfo, faBan, faMagnifyingGlass, faFacebook, faTwitter, faInstagram, faYoutube)

createApp(App).use(i18n).use(router, axios, vueAxios).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
