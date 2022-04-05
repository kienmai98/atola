import axios from '@/plugins/axios'
import Fiat from '@/store/init/Fiat'
const fiat = {
    state: () => (Fiat),
    mutations: {
        setFiatList (state, payload) {
            state.fiatList = payload
            state.favorites = state.fiatList.filter(item => item.favorite === 1)
        },
    },
    actions: {
        async getFiatList ({ commit }) {
            await axios.get('/fiat')
                .then(response => {
                    commit('setFiatList', response.data)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
}
export default fiat;