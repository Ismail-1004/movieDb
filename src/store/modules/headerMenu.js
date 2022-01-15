export default {
    state: {
        showMenu: false
    },
    mutations: {
        showSide (state) {
           return state.showMenu = true
        },
        closeSide (state) {
           return state.showMenu = false
        }
    },
    actions: {},
    getters: {
        getShow (state) {
            return state.showMenu
        }
    }
}