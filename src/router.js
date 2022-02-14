import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/Home.vue'
import { SUPPORT_LOCALES, i18n, loadLocaleMessages, setI18nLanguage, getBrowserLocale } from './i18n'

function load (component) {
  return () => import(`@/views/${component}.vue`)
}

const routes = [{
  path: '/:locale',
  component: {
    template: "<router-view></router-view>"
  },
  children: [
    {
      path: '',
      name: 'Home',
      meta: {layout: 'main'},
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      meta: {layout: 'empty'},
      component: load('Login')
    },
    {
      path: 'movie/:id',
      name: 'Movie',
      meta: {layout: 'main'},
      component: load('Movie'),
      props: true
    },
    {
      path: 'registration',
      name: 'Registration',
      meta: {layout: 'empty'},
      component: load('Registration'),
    }
  ]
},
{
  path: '/:catchAll(.*)',
  redirect() {
    return getBrowserLocale()
  }
}]



const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {
  window.scrollTo(0,0);
  const paramsLocale = to.params.locale

  const locale = getBrowserLocale()


  // use locale if paramsLocale is not in SUPPORT_LOCALES
  if (!SUPPORT_LOCALES.includes(paramsLocale)) {
    return next(`/${locale}`)
  }

  // load locale messages
  if (!i18n.global.availableLocales.includes(paramsLocale)) {
    await loadLocaleMessages(i18n, paramsLocale)
  }

  // set i18n language
  setI18nLanguage(i18n, paramsLocale)


  return next()
})

export default router