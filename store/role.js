import { httpEndpoint } from "~/services/https/endpoints"
import { appPagination } from "~/services/https/httpServices"

export const state = () => ({
    allEntries: null,
    createEntries: null,
    updateEntry: null,
    deleteEntry: null,
    roles: [],
    currentRole: null
})

export const mutations = {
    setRoles(state, payload) {
        state.roles = payload
    },

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
    setCurrentRole(state, payload) {
        state.currentRole = payload
    }
}

export const actions = {
    async getRoles({ commit }) {
        try {
            const params = {
                currentPage: 1,
                pageSize: appPagination.maximumPageSize,
                active: true
            }
            const response = await this.$axios.$get(`${httpEndpoint.roles.getEntries}`, { params })
            if (response) {
                commit(
                    "setRoles",
                    response
                        ? response.data.map((role) => ({
                              id: role.id,
                              name: role.name,
                              systemName: role.systemName,
                              isSystemRole: role.isSystemRole
                          }))
                        : []
                )
            } else {
                commit("setRoles", [])
            }
        } catch (e) {
            console.log(e)
            commit("setRoles", [])
        }
    },

    async getAllEntries({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.roles.getEntries}`, payload)
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
    async createNewEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.roles.createEntry}`,
                payload.params
            )
            if (response) {
                commit("setCreateEntries", response.data)
            } else {
                commit("setCreateEntries", null)
            }
        } catch (e) {
            commit("setCreateEntries", null)
            console.log(e)
        }
    },
    async updateEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$put(
                `${httpEndpoint.roles.updateEntry}`,
                payload.params
            )
            if (response) {
                commit("setUpdateEntry", response.data)
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
            const response = await this.$axios.$delete(
                `${httpEndpoint.roles.trashEntry}?Id=${payload}`
            )
            if (response.success) {
                commit("setDeleteEntry", response)
                const params = {
                    page: 1,
                    pageSize: 99,
                    data: {
                        deleted: false
                    }
                }
                const responseAllEntries = await this.$axios.$post(
                    `${httpEndpoint.roles.getEntries}`,
                    params
                )
                if (responseAllEntries) {
                    commit("setAllEntries", responseAllEntries)
                } else {
                    commit("setAllEntries", [])
                }
            } else {
                commit("setDeleteEntry", null)
            }
        } catch (e) {
            commit("setDeleteEntry", null)
            commit("setAllEntries", [])
            console.log({ error: e.message })
        }
    }
}
