// templates
import { httpEndpoint } from "~/services/https/endpoints"
import qs from "qs"

const initialDetais = {
    id: 0,
    templateName: "",
    layoutFID: 1,
    templateDescription: "",
    isSharable: true,
    active: true,
    deleted: false,
    metadata: "",
    sectionTemplateDetails: [],
    sections: []
}

export const state = () => ({
    publishedEntries: [],
    fields: [],
    details: initialDetais,
    isUpdating: false,
    unSavedFields: [],
    deletingFields: [],
    updatingFields: [],
    updatingField: null,
    success: false, // successfull status, use for notification
    error: false // error status, use for notification
})

export const mutations = {
    setUnSavedFields(state, payload) {
        console.log({ unSavedFields: payload })
        state.unSavedFields = payload
    },

    setFields(state, payload) {
        state.fields = payload
    },

    setDeletingFields(state, payload) {
        state.deletingFields = payload
    },

    setUpdatingFields(state, payload) {
        state.updatingFields = payload
    },

    setUpdatingField(state, payload) {
        state.updatingField = payload
    },

    setDetails(state, payload) {
        state.details = payload
    },

    setPublishedEntries(state, payload) {
        state.publishedEntries = payload
    },

    setSuccess(state, payload) {
        state.success = payload
    },

    setIsUpdating(state, payload) {
        state.isUpdating = payload
    },

    resetDetails(state) {
        state.details = initialDetais
    }
}

export const actions = {
    async getEntryByID({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.templates.root}/${payload}`)
            commit("setDetails", response)
        } catch (e) {
            commit("setDetails", null)
            console.log(e)
        }
    },
    async getFieldsByTemplateID({ commit, state }, payload) {
        try {
            const templateParams = qs.stringify({
                SectionTemplateFID: payload ? payload : state.details.id
            })

            const response = await this.$axios.$get(
                `${httpEndpoint.templateFields.getByTemplateID}?${templateParams}`
            )
            commit(
                "setFields",
                response.sort((a, b) => b.orderBy - a.orderBy)
            )
        } catch (e) {
            commit("setDetails", [])
        }
    },

    async addFieldsToTemplate({ commit, dispatch }, payload) {
        try {
            if (payload.length > 0) {
                await Promise.all(
                    payload.map(async (entry) => {
                        await this.$axios.$post(httpEndpoint.templateFields.root, {
                            ...entry
                        })
                    })
                )

                await commit("setUnSavedFields", [])
                await dispatch("getFieldsByTemplateID")
                await dispatch("app/showSnackBar", "Add new fields done", { root: true })
            }
        } catch (e) {
            console.log(e)
        }
    },

    async deleteTemplateFields({ commit, dispatch }, payload) {
        try {
            if (payload.length > 0) {
                await Promise.all(
                    payload.map(async (entry) => {
                        await this.$axios.$delete(httpEndpoint.templateFields.root, {
                            data: {
                                id: entry.id
                            }
                        })
                    })
                )
                await commit("setDeletingFields", [])
                await dispatch("getFieldsByTemplateID")
                await dispatch("app/showSnackBar", "Delete fields successfully!", { root: true })
            }
        } catch (e) {
            console.log(e)
        }
    },

    async updatedTemplateFields({ commit, dispatch }, payload) {
        try {
            if (payload.length > 0) {
                const actualPayload = {
                    "sectionTemplateDetails": [
                        ...payload
                    ]
                }
                console.log({actualPayload})
                await this.$axios.$put(httpEndpoint.templateFields.bulkUpdate, actualPayload)
              /*  await Promise.all(
                    payload.map(async (entry) => {

                    })
                )*/
                await commit("setUpdatingFields", [])
                await dispatch("getFieldsByTemplateID")
                await dispatch("app/showSnackBar", "Update fields successfully!", { root: true })
            }
        } catch (e) {
            console.log(e)
        }
    },

    async createNewEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint.sites.createEntry}`, payload)
            if (response) {
                const { success, data } = response
                if (success) {
                    await this.$router.push(`/domains/${data.id}`)
                }
            }
        } catch (e) {
            console.log(e)
        }
    },

    async updateEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.sites.updateEntry}`, payload)
            if (response) {
                const { success, data } = response
                if (success) {
                    await this.$router.push(`/domains/${data.id}`)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}
