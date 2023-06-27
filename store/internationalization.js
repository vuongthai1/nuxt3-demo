import { httpEndpoint } from "~/services/https/endpoints"
import { appPagination } from "~/services/https/httpServices"

const initialDetais = {
    id: 0,
    languageName: "",
    languageCode: "",
    cssClass: "",
    resourceKey: "",
    active: true,
    deleted: true,
    remarks: ""
}

export const state = () => ({
    allEntries: null,
    createEntries: null,
    updateEntry: null,
    deleteEntry: null
})

export const mutations = {
    setAllEntries(state, payload) {
        state.allEntries = payload
    },
    setCreateEntries(state, payload) {
        state.createEntries = payload
    },
    setUpdateEntry(state, payload) {
        state.updateEntry = payload
    },
    setDeleteEntry(state, payload) {
        state.deleteEntry = payload
    }
}

export const actions = {
    async getAllEntries({ commit }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.languages.getEntries}`,
                payload
            )
            if (response) {
                commit("setAllEntries", response)
            } else {
                commit("setAllEntries", [])
            }
        } catch (e) {
            console.log({ error: e.message })
            commit("setAllEntries", [])
        }
    },
    async createNewEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.languages.createEntry}`,
                payload.params
            )
            if (response) {
                commit("setCreateEntries", response.data)
            } else {
                commit("setCreateEntries", null)
            }
        } catch (e) {
            commit("setCreateEntries", null)
            console.log({ error: e.message })
        }
    },
    async updateEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$put(
                `${httpEndpoint.languages.updateEntry}`,
                payload.params
            )
            if (response) {
                commit("setUpdateEntry", response.data)
            } else {
                commit("setUpdateEntry", null)
            }
        } catch (e) {
            commit("setUpdateEntry", null)
            console.log({ error: e.message })
        }
    },
    async trashEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$delete(
                `${httpEndpoint.languages.trashEntry}?ID=${payload}`
            )
            if (response.success) {
                commit("setDeleteEntry", response)
                const params = {
                    page: 1,
                    pageSize: 99,
                    data: {
                        delete: false
                    }
                }
                const responseAllEntries = await this.$axios.$post(
                    `${httpEndpoint.languages.getEntries}`,
                    params
                )
                if (responseAllEntries) {
                    commit("setAllEntries", responseAllEntries)
                } else {
                    commit("setAllEntries", null)
                }
            } else {
                commit("setDeleteEntry", null)
            }
        } catch (e) {
            commit("setDeleteEntry", null)
            commit("setAllEntries", null)
            console.log({ error: e.message })
        }
    }
}
