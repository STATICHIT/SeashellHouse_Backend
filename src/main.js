import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import Carousel from './views/carousel.vue'

const app = createApp(App)

installElementPlus(app)
app
    .component('my-carousel',Carousel)
    .use(store)
    .use(router)
    .mount('#app')