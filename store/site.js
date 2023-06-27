import { httpEndpoint } from "~/services/https/endpoints"
import { getActiveEntries, convertParentEntriesChildren } from "~/services/app-services"
import { appPagination } from "~/services/https/httpServices"
import qs from "qs"

export const state = () => ({
    activeSite: null,
    publishedEntries: [],
    details: null,
    isUpdating: false,
    success: false, // successfull status, use for notification
    error: false, // error status, use for notification
    layouts: [], // site layouts
    sitesConverted: []
})

export const mutations = {
    setActiveSite(state, payload) {
        state.activeSite = payload
    },

    setDetails(state, payload) {
        state.details = payload
    },

    setPublishedEntries(state, payload) {
        state.publishedEntries = payload
    },
    setSitesConverted(state, payload) {
        const ids = payload.map((x) => x.id)
        state.sitesConverted =
            payload.length > 0 ? convertParentEntriesChildren(payload, "parentFID", ids) : []
    },
    setSuccess(state, payload) {
        state.success = payload
    },

    setIsUpdating(state, payload) {
        state.isUpdating = payload
    },

    resetDetails(state) {
        state.details = null
    },

    setLayouts(state, payload) {
        state.layouts = payload
    }
}

export const actions = {
    async getEntryByID({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.sites.getEntryByID}/${payload}`)
            if (response) {
                commit("setDetails", response)
            } else {
                commit("setDetails", null)
            }
        } catch (e) {
            commit("setDetails", null)
            console.log({ Error: e.message })
        }
    },

    async getPublishedEntries({ commit, dispatch, $auth }) {
        try {
            const query = qs.stringify({
                page: 1,
                pageSize: appPagination.maximumPageSize, // get all entry
                deleted: false
            })
            const response = await this.$axios.$get(`${httpEndpoint.sites.root}?${query}`)
            if (response) {
                const { data } = response
                if (data) {
                    commit("setPublishedEntries", data.length > 0 ? getActiveEntries(data) : [])
                    await dispatch("getSiteLayouts")
                    return data
                } else {
                    commit("setPublishedEntries", [])
                    await dispatch("getSiteLayouts")
                    return []
                }
            } else {
                commit("setPublishedEntries", [])
                return []
            }
        } catch (e) {
            commit("setPublishedEntries", [])
        }
    },

    async createNewEntry({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint.sites.createEntry}`, payload)
            if (response.message === "Successfully") {
                await dispatch(
                    "app/showSnackBar",
                    "The creation of a new site has been completed.",
                    { root: true }
                )
                await this.$router.push(`/domains/${response.id}?type=homepage`)
            }
        } catch (e) {
            console.log(e)
        }
    },

    async updateEntry({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.sites.updateEntry}`, payload)
            if (response.valid) {
                await dispatch("app/showSnackBar", "Your changes have been saved", { root: true })
                await dispatch("site/getEntryByID", payload.id, { root: true })
            }
        } catch (e) {
            await dispatch("app/showSnackBar", "Can't save your changes. Please try again", {
                root: true
            })
            console.log(e)
        }
    },

    async getSiteLayouts({ commit }) {
        try {
            const response = await this.$axios.$get(httpEndpoint.sites.siteLayouts)
            if (response) {
                const { data } = response
                commit("setLayouts", data.length > 0 ? data : [])
            }
        } catch (e) {
            console.log(e)
            commit("setLayouts", [])
        }
    },

    async getAllSites({ commit }, payload) {
        try {
            const query = qs.stringify({
                page: 1,
                pageSize: appPagination.maximumPageSize, // get all entry
                deleted: false
            })

            const response = await this.$axios.$get(`${httpEndpoint.sites.getEntries}?${query}`)
            if (response) {
                const { data } = response

                if (data) {
                    commit("setSitesConverted", data.length > 0 ? data : [])
                    return data
                } else {
                    commit("setSitesConverted", [])
                    return []
                }
            } else {
                commit("setSitesConverted", [])
                return []
            }
        } catch (e) {
            commit("setSitesConverted", [])
            console.log(e)
        }
    },

    async deleteSite({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$delete(`${httpEndpoint.sites.trashEntry}`, payload)
            if (response.valid) {
                await dispatch("app/showSnackBar", "Delete domain successfully!", { root: true })
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    },

    async updateSiteStatus({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(
                `${httpEndpoint.sites.updateSiteStatus}`,
                payload
            )
            if (response.valid) {
                await dispatch("app/showSnackBar", "Update site status successfully!", {
                    root: true
                })
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
