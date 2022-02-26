import firebase from 'firebase/compat/app'

export default {
    actions: {
        async login ({ dispatch, commit }, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email,password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async register ({ dispatch }, {email,password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email,password)
                const uId = await dispatch('getUId')
                await firebase.database().ref(`/users/${uId}/info`).set({
                    name
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUId () {
            const user = firebase.auth().currentUser;
            return user ? user.uid : null
        },
        async logout ({ commit, state }) {
            await firebase.auth().signOut()
            console.log(1);
            commit('clearInfo')
            
        }
    },
}