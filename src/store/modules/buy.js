import Buy from '@/store/init/Buy'
import axios from '@/plugins/axios'
const buy = {
    state: () => (Buy),
    mutations: {
        setBuyTokenInfo (state, payload) {
            state.token.name = payload.name
            state.token.fullname = payload.fullname
            state.token.path = payload.path
        },
        setBuyFiatInfo (state, payload) {
            state.fiat.name = payload.name
            state.fiat.symbol = payload.symbol
            state.fiat.path = payload.path
        },
        setType(state, payload) {
            state.amount = payload
        }
    },
    actions: {
        async getBuyStableInfo ({ commit }, data) {
            await axios.get('/stableToken?name_like=' + data)
                .then(response => {
                    commit('setBuyTokenInfo', response.data[0])
                })
                .catch(e => {
                    console.log(e);
                })
            
        },
        async getBuyFiatInfo ({ commit }, data) {
            await axios.get('/fiat?symbol_like=' + data)
                    .then(response => {
                        commit('setBuyFiatInfo', response.data[0])
                    })
                    .catch(e => {
                        console.log(e);
                    })
        }
    }
}
export default buy;