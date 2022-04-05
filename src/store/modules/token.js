import axios from '@/plugins/axios'
import Token from '@/store/init/Token'
const token = {
    state: () => (Token),
    mutations: {
        setTokens (state, payload) {
            state.tokens = payload
            state.favorites = state.tokens.filter(item => item.favorite === 1)
        },
        updateFavoriteTokens(state, payload) {
            const objIndex = state.tokens.findIndex(item => item.fullname.localeCompare(payload.item.fullname) === 0)
            state.tokens[objIndex].favorite = payload.value

            const objFavoriteIndex = state.favorites.findIndex(item => item.fullname.localeCompare(payload.item.fullname) === 0)
            if (objFavoriteIndex > -1) {
                state.favorites.splice(objFavoriteIndex, 1)
            } else {
                payload.item.favorite = payload.value
                state.favorites.push(payload.item)
            }
        },
        removeFavoriteItem(state, payload) {
            const objIndex = state.tokens.findIndex(item => item.fullname.localeCompare(payload.item.fullname) === 0)
            state.tokens[objIndex].favorite = 0
            state.favorites.splice(payload.value, 1)
        }
    },
    actions: {
        async loadTokens({ commit }, data) {
            await axios.get('/token-list', data)
                .then(response => {
                    commit('setTokens', response.data)
                })
                .catch(e => {
                    console.log(e);
                })
        },
    }
}
export default token;