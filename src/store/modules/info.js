import firebase from 'firebase/compat/app'

export default {
    state: {
        info: {},
        showLogin: true,
        showUser: false
    },
    mutations: {
        setInfo (state, info) {
            state.info = info
        },
        clearInfo (state) {
            state.info = {}
        },
        signOut (state) {
            state.showLogin = true
            state.showUser = false
        }
    },
    actions: {
        async fetchInfo( { dispatch, commit, state } ) {
            try {
                const uid = await dispatch('getUId')
                const info = (await firebase.database().ref(`users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
                state.showLogin = false
                state.showUser = true
            } catch (e) {}
            
        }
    },
    getters: {
        info (state) {
            return state.info
        },

        showLogin (state) {
            return state.showLogin
        },

        showUser (state) {
            return state.showUser
        }
    }
}