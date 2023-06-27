import { httpEndpoint } from "~/services/https/endpoints"
import { appPagination } from "~/services/https/httpServices"

export const state = () => ({
    entries: [],
    selectedType: null
})

export const mutations = {
    setEntries(state, payload) {
        state.entries = payload
    }
}

export const actions = {
    async getEntries({ commit }) {
        try {
            const response = await this.$axios.$get(httpEndpoint.contentTypes)

            if (response) {
                const { data } = response
                commit("setEntries", data && data.length > 0 ? data : [])
            } else {
                commit("setEntries", [])
            }
        } catch (e) {
            commit("setEntries", [])
            console.log(e)
        }
    }
}
