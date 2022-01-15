export default {
    state: {
        allMovies: [],
        page: 1,
        showPrelouder: true,
        showMovie: false
    },
    mutations: {
        films(state, film) {
            return state.allMovies = film
        },
        goBack (state) {
            if (state.showPrelouder === false) {
                state.showPrelouder = true
                state.showMovie = false
            }
        }
    },
    actions: {
        async getNowPlaying ({ commit, state }) {
            await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=259c54c53e1db75ca5c5abe2e40a02d0&language=en-US-US&page=${state.page}`)
                .then(response => response.json())
                .then(data => {
                    commit('films', data['results'])
                    setTimeout(() => state.showPrelouder = false, 1000)
                    setTimeout(() => state.showMovie = true, 1000)
                })
            
        },
        async topReated ({commit, state}, page = 1) {
            await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=259c54c53e1db75ca5c5abe2e40a02d0&language=en-US&page=${page}`)
                .then(response => response.json())
                .then(data => {
                    commit('films', data['results'])
                    setTimeout(() => state.showPrelouder = false, 1000)
                    setTimeout(() => state.showMovie = true, 1000)
                })
        }
    },
    getters: {
        getFilms(state) {
            return state.allMovies
        },
        getPrelouder (state) {
            return state.showPrelouder
        },
        getShowMovie (state) {
            return state.showMovie
        }
    }
}

