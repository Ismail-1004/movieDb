import { createStore } from 'vuex'
import allMovies from './modules/allMovies'
import auth from './modules/auth'
import headerMenu from './modules/headerMenu'

export default createStore({
  modules: {
    allMovies,
    auth,
    headerMenu
  }
})
