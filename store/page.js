import { httpEndpoint } from "~/services/https/endpoints"
import { convertRawToPageData } from "~/services/page-services"
import qs from "qs"

export const state = () => ({
    pages: null,
    sectionSelected: [],
    sectionSelectedDetails: [],
    statusUpdate: false,
    pageUpdate: null, // DONT USE
    pageDetails: null,
    pageBySiteId: [],
    templates: [],
    mainSite: []
})

export const mutations = {
    setPages(state, payload) {
        state.pages = payload
    },

    setSectionSelected(state, payload) {
        state.sectionSelected = payload
    },
    setSectionSelectedDetails(state, payload) {
        state.sectionSelectedDetails = payload
    },
    setStatusUpdate(state, payload) {
        state.statusUpdate = payload
    },
    setPageUpdate(state, payload) {
        state.pageUpdate = payload
    },
    setPageBySiteId(state, payload) {
        state.pageBySiteId = payload
    },

    resetState(state) {
        state.pages = null
        state.sectionSelected = []
        state.sectionSelectedDetails = []
        state.pageUpdate = null
        state.pageBySiteId = []
    },

    setPageDetails(state, payload) {
        state.pageDetails = payload
    },
    setTemplates(state, payload) {
        state.templates = payload
    },
    setMainSite(state, payload) {
        state.mainSite = payload
    }
}

export const actions = {
    async getAllDataPages({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.pages.root}`, {
                params: payload
            })
            if (response) {
                commit("setPages", response)
            } else {
                commit("setPages", null)
            }
        } catch (e) {
            commit("setPages", null)
            console.log({ error: e.message })
        }
    },
    async getMainsite({ commit, rootState }) {
        const params = {
            Slug: "mainsite"
        }
        try {
            const response = await this.$axios.$get(`${httpEndpoint.pages.root}`, {
                params: params
            })
            if (response) {
                commit("setMainSite", response)
            } else {
                commit("setMainSite", [])
            }
        } catch (e) {
            commit("setMainSite", [])
            console.log({ error: e.message })
        }
    },

    async createPage({ commit, dispatch, state }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint.pages.createEntry}`, payload)
            if (response) {
                commit("setPageDetails", response)
                return response
            } else {
                commit("setPageDetails", null)
                return null
            }
        } catch (e) {
            commit("setPageDetails", null)
            return null
        }
    },
    async createMappingPageAndSections({ commit }, payload) {
        try {
            await this.$axios.$post(`${httpEndpoint.pages.mappingPageAndSections}`, payload)
        } catch (e) {
            console.log({ error: e.message })
        }
    },
    async updatePage({ commit }, payload) {
        try {
            await this.$axios.$put(`${httpEndpoint.pages.updateEntry}`, payload)
        } catch (e) {
            console.log({ error: e.message })
        }
    },

    async updateEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.pages.updateEntry}`, payload)
            if (response.success) {
                commit("setStatusUpdate", true)
            } else {
                commit("setStatusUpdate", false)
            }
        } catch (e) {
            commit("setStatusUpdate", false)
            console.log({ error: e.message })
        }
    },

    async deleteEntry({ commit }, payload) {
        try {
            await this.$axios.$delete(`${httpEndpoint.pages.deleteEntry}?ID=${payload}`)
        } catch (e) {
            console.log({ error: e.message })
        }
    },

    async updateOrderIndexMappingEntry({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(httpEndpoint.pages.mapping, payload.data)
            if (response.valid) {
                await dispatch("getPageDetails", payload.pageID)
                return response?.success
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },

    async toggleMappingEntry({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(
                `${httpEndpoint.pages.updateMappingEntry}`,
                payload.data
            )
            if (response.success) {
                dispatch("getEntryByID", payload.pageID)
                return response?.success
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },

    async getEntryByID({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.pages.getEntryByID}?Id=${payload}`
            )
            if (response) {
                await commit("setPageDetails", response.data)
                await commit(
                    "setSectionSelected",
                    convertRawToPageData(response.data.sectionMappings)
                )
                await commit(
                    "setSectionSelectedDetails",
                    convertRawToPageData(response.data.sectionMappings.map((val) => val))
                )
            }
        } catch (e) {
            console.log({ error: e.message })
        }
    },

    async getPageDetailOnly({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.pages.root}/${payload}`)
            return response ? response : null
        } catch (e) {
            return null
        }
    },

    async getPageDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.pages.root}/${payload}`)
            if (response) {
                await commit("setPageDetails", response)
                return response
            }
        } catch (e) {
            await commit("setPageDetails", null)
            return null
        }
    },

    async createPageSectionByLayoutID({ commit }, payload) {
        try {
            const response = await this.$axios.$post(httpEndpoint.sections.bulkCreate, payload)
            return response ? response : null
        } catch (e) {
            return null
        }
    },

    async duplicatePage({ commit, dispatch, rootState }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.pages.clonePage}`,
                payload.data
            )
            if (response.success) {
                dispatch("getEntryByID", payload.pageID)
                const params = {
                    page: 1,
                    pageSize: 10,
                    data: {
                        siteFID: rootState.site.activeSite.id,
                        active: true,
                        deleted: false
                    }
                }
                await dispatch("getAllDataPages", params)
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },

    async updatePageSectionMapping({ commit }, payload) {
        try {
            return await this.$axios.$put(`${httpEndpoint.pages.updatePageSection}`, payload)
        } catch (e) {
            console.log({ error: e.message })
        }
    },

    async deletePageSectionMapping({ commit }, payload) {
        try {
            return await this.$axios.$delete(`${httpEndpoint.pages.deletePageSection}`, {
                data: payload
            })
        } catch (e) {
            console.log({ error: e.message })
        }
    },

    async getPagesBySiteId({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.pages.getPagesBySiteId}?SiteFID=${payload}`
            )
            if (response) {
                const responseSort = response.sort((a, b) => b.id - a.id)
                await commit("setPageBySiteId", responseSort)
            } else {
                await commit("setPageBySiteId", [])
            }
        } catch (e) {
            await commit("setPageBySiteId", [])
            console.log({ Error: e.message })
        }
    },

    async getTemplatesByLayoutFID({ commit }, payload) {
        try {
            const params = qs.stringify({
                PageSize: 9999,
                Active: true
            })
            const response = await this.$axios.$get(`${httpEndpoint.templates.root}?${params}`)
            if (response) {
                await commit(
                    "setTemplates",
                    response.data.length !== 0
                        ? response.data.filter((val) => val.deleted === false)
                        : []
                )
                console.log({ validItem: response.data.filter((val) => val.deleted === false) })
                return true
            } else {
                await commit("setTemplates", [])
                return false
            }
        } catch (e) {
            await commit("setTemplates", [])
            console.log({ Error: e.message })
            return false
        }
    },
    async updatePageStatus({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.pages.setPublish}`, payload)
            if (response.valid) {
                await dispatch("app/showSnackBar", "Your changes has been saved successfully.", {
                    root: true
                })
            }
        } catch (e) {
            console.log({ Error: e.message })
        }
    }
}
