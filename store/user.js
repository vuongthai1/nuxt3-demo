import { httpEndpoint } from "~/services/https/endpoints"
import { appPagination } from "~/services/https/httpServices"

export const state = () => ({
    allEntries: [],
    createEntries: null,
    updateEntry: null,
    deleteEntry: null,
    authenInfo: null
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
    },
    setAuthenInfo(state, payload) {
        console.log({ authInfo: payload })
        state.authenInfo = payload
    }
}

export const actions = {
    async getAllEntries({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.users.getEntries}`, payload)
            if (response) {
                commit("setAllEntries", response)
            } else {
                commit("setAllEntries", [])
            }
        } catch (e) {
            console.log(e)
            commit("setAllEntries", [])
        }
    },
    async createNewEntry({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.users.createEntry}`,
                payload.params
            )
            if (response) {
                commit("setCreateEntries", response.data)
                await dispatch("app/showSnackBar", "Create user successfully.", {
                    root: true
                })
            } else {
                commit("setCreateEntries", null)
            }
        } catch (e) {
            commit("setCreateEntries", null)
            console.log(e)
        }
    },

    async updateEntry({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(
                `${httpEndpoint.users.updateEntry}`,
                payload.params
            )
            if (response) {
                commit("setUpdateEntry", response.data)
                await dispatch("app/showSnackBar", "Update user information successfully.", {
                    root: true
                })
            } else {
                commit("setUpdateEntry", null)
            }
        } catch (e) {
            commit("setUpdateEntry", null)
            console.log(e.message)
        }
    },

    async trashEntry({ commit }, payload) {
        try {
            // const response = await this.$axios.$delete(
            //     `${httpEndpoint.users.deleteEntry}?Id=${payload}`
            // )
            const response = await this.$axios.$delete(`${httpEndpoint.users.deleteEntry}`, payload)
            if (response) {
                commit("setDeleteEntry", response)
                const params = {
                    currentPage: 1,
                    pageSize: appPagination.defaultPageSize
                }
                const responseAllEntries = await this.$axios.$get(
                    `${httpEndpoint.users.getEntries}`,
                    { params }
                )
                if (responseAllEntries) {
                    commit("setAllEntries", responseAllEntries)
                } else {
                    commit("setAllEntries", [])
                }
            } else {
                // commit("setDeleteEntry", null)
            }
        } catch (e) {
            commit("setAllEntries", [])
            commit("setDeleteEntry", null)
            console.log({ error: e.message })
        }
    },
    async getAuthenIfo({ commit }) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.auth.getAuthenInfo}`)
            //console.log({ authenInfoResponse: response })
            if (response) {
                commit("setAuthenInfo", response)
                this.$store.commit("role/setCurrentRole", response)
                return true
            } else {
                //await commit("setAuthenInfo", null)
                return false
            }
        } catch (e) {
            //await commit("setAuthenInfo", null)
            return false
        }
    }
}
