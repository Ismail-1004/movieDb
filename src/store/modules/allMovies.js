export default {
    state: {
        allMovies: [],
    },
    mutations: {
        films(state, film) {
            return state.allMovies = film
        }
    },
    actions: {
        async getAllMovies(ctx, page = 1) {
            await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=259c54c53e1db75ca5c5abe2e40a02d0&language=en-US-US&page=${page}`)
                .then(response => response.json())
                .then(data => {
                    ctx.commit('films', data['results'])
                })
        },
        async topReated (ctx, page = 1) {
            await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=259c54c53e1db75ca5c5abe2e40a02d0&language=en-US&page=${page}`)
                .then(response => response.json())
                .then(data => {
                    ctx.commit('films', data['results'])
                })
        }
    },
    getters: {
        getFilms(state) {
            return state.allMovies
        }
    }
}

