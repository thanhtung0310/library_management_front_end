import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueAxios from 'vue-axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCircleInfo, faBan } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCircleInfo, faBan)

createApp(App).use(router, Axios, VueAxios).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
