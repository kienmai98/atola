import axios from '@/plugins/axios'

const user = {
    state: () => ({
        count: 0,
        user: []
    }),
    mutations: {
        increment (state) {
            state.count++
        }
    },
    actions: {
        increment ({ commit }) {
            axios.get('/users')
                .then(response => {
                    commit('increment', response.data)
            })
        }
    }
}
export default user;