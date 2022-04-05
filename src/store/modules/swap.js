import axios from '@/plugins/axios'
import Swap from '@/store/init/Swap'
const swap = {
    state: () => (Swap),
    mutations: {
        refreshData (state, payload) {
            state.from = payload.from
            state.to = payload.to
            state.quotesList = payload.quotesList
            
        },
        updateNumberToken (state, payload) {
            state.from.numberToken = payload
        },
        changeStatusRefreshFlag (state, payload) {
            state.refreshFlag = payload
        },
        changeStatusExpandFlag (state) {
            state.expandFlag = !state.expandFlag
        },
        changeQuoteList(state, payload) {
            // Because only change 2 to end
            payload++;
            if (state.expandFlag === true) {
                state.expandFlag = false
            }
            if (payload !== 1) {
                const temp = Object.assign({}, state.quotesList[payload])
                const temp2 = Object.assign({}, state.quotesList[1])
                state.quotesList[payload] = temp2
                state.quotesList[1] = temp
            }
        },
        setNetworks (state, payload) {
            state.networks = payload
        },
        setWallets (state, payload) {
            state.wallets = payload
        },
    },
    actions: {
        async refreshData ({ state, commit }, data) {
            commit('changeStatusRefreshFlag', true)
            data.numberToken = state.from.numberToken
            await axios.post('/change-price', data)
                .then(response => {
                    commit('refreshData', response.data)
                })
                .catch(e => {
                    console.log(e);
                })
            commit('changeStatusRefreshFlag', false)
        },
        async loadNetworks ({ commit }, data) {
            await axios.get('/networks', data)
                .then(response => {
                    commit('setNetworks', response.data)
                })
                .catch(e => {
                    console.log(e);
                })
        },
        async loadWallets({ commit }, data) {
            await axios.get('/wallets', data)
                .then(response => {
                    commit('setWallets', response.data)
                })
                .catch(e => {
                    console.log(e);
                })
        },
        changeNumberToken ({ state, commit, dispatch }, data) {
            commit('updateNumberToken', parseFloat(data))
            const refreshData = {
                fromToken: state.from.tokenCode,
                toToken: state.to.tokenCode,
                numberToken: data
              }
            dispatch('refreshData', refreshData)
        }
    }
}
export default swap;