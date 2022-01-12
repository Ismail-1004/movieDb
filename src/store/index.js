import { createStore } from 'vuex'
import allMovies from './modules/allMovies'
import auth from './modules/auth'

export default createStore({
  modules: {
    allMovies,
    auth
  }
})
