import SellStableToken from '@/store/init/SellStableToken'
import axios from '@/plugins/axios'
const sellStableToken = {
    state: () => (SellStableToken),
    mutations: {
        setSellTokenInfo (state, payload) {
            state.token.name = payload.name
            state.token.fullname = payload.fullname
            state.token.path = payload.path
        },
        setSellFiatInfo (state, payload) {
            state.fiat.name = payload.name
            state.fiat.symbol = payload.symbol
            state.fiat.path = payload.path
        },
        setAmount(state, payload) {
            state.amount = payload
        },
        setType(state, payload) {
            state.amount = payload
        }
    },
    actions: {
        async getSellStableInfo ({ commit }, data) {
            await axios.get('/stableToken?name_like=' + data)
                .then(response => {
                    commit('setSellTokenInfo', response.data[0])
                })
                .catch(e => {
                    console.log(e);
                })
            
        },
        async getSellFiatInfo ({ commit }, data) {
            await axios.get('/fiat?symbol_like=' + data)
                    .then(response => {
                        commit('setSellFiatInfo', response.data[0])
                    })
                    .catch(e => {
                        console.log(e);
                    })
        }
    }
}
export default sellStableToken;