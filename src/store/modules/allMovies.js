// export default {
//     state: {
//         arraOfFilms: [],
//         page: 1
//     },
//     mutations: {
//         showPosts(state, film) {
//             state.arraOfFilms = film
//             if (state.arraOfFilms.length != 40) {
//                 state.arraOfFilms.push(film);
//             }
//         }
//     },
//     actions: {
//         async getAllMovies(ctx, page = 1) {
//             const response = await fetch(
//                 `https://api.themoviedb.org/3/movie/now_playing?api_key=259c54c53e1db75ca5c5abe2e40a02d0&language=en-US&page=${page}`
//             );
//             const data = await response.json();

//             ctx.commit('showPosts', data['results'])

//             // if (this.arraOfFilms.length != 40) {
//             //     this.arraOfFilms.push(...data["results"]);
//             // }
//         },
//     },
//     getters: {
//         getPost(state) {
//             return state.arraOfFilms
//         }
//     }
// }