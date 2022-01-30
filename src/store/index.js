import { createStore } from 'vuex'
import allMovies from './modules/allMovies'
import auth from './modules/auth'
import headerMenu from './modules/headerMenu'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error (state) {
      return state.error
    }
  },
  modules: {
    allMovies,
    auth,
    headerMenu
  }
})
