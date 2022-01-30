import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import VueObserveVisibility from 'vue-observe-visibility'
import './assets/scss/main.scss'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import { i18n } from './i18n'

const app = createApp(App)

const i18nRoute = (to) => {
    return {
        ...to,
        params: {
            locale: i18n.global.locale,
            ...to.params 
        }
    }
}
app.config.globalProperties.$i18nRoute = i18nRoute

firebase.initializeApp({
    apiKey: "AIzaSyCwm09dXdK62S35KHM3lHnjQl3ONhkPTXs",
    authDomain: "vue-movie-c0522.firebaseapp.com",
    projectId: "vue-movie-c0522",
    storageBucket: "vue-movie-c0522.appspot.com",
    messagingSenderId: "433642440149",
    appId: "1:433642440149:web:895c8a83e6dc1acc49695c"
})

let info;

firebase.auth().onAuthStateChanged(() => {
    if (!info) {
        info = app.use(store).use(router).use(VueObserveVisibility).use(i18n).mount('#app')
    }
})

