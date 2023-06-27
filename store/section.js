import { httpEndpoint } from "~/services/https/endpoints"
import { appPagination } from "~/services/https/httpServices"
import qs from "qs"

const initialDetais = {
    id: 0,
    siteFID: 0,
    sectionName: "string",
    slug: "string",
    description: "string",
    active: true,
    deleted: false,
    metadata: "string"
}

export const state = () => ({
    sections: null,
    publishedEntries: [],
    fields: [],
    details: initialDetais,
    isUpdating: false,
    deletingFields: [],
    updatingFields: [],
    updatingField: null,
    success: false, // successfull status, use for notification
    error: false, // error status, use for notification,
    sectionInfo: null, // section info get from DB,
    sectionDetails: [], // section details get from DB
    templateFields: [], // template fields of current section,
    unSavedFields: [], // data to submit form
    templates: [], // list of available templates
    templateInfo: null
})

export const mutations = {
    setSections(state, payload) {
        state.sections = payload
        // console.log("state.sections::", state.sections)
    },

    setTemplateFields(state, payload) {
        state.templateFields = payload
    },

    setSectionDetails(state, payload) {
        state.sectionDetails = payload
    },

    setTemplates(state, payload) {
        state.templates = payload
    },

    setSectionInfo(state, payload) {
        state.sectionInfo = payload
    },

    setUnSavedFields(state, payload) {
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
        // console.log("setDetails payload",payload)
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
    },

    setTemplateInfo(state, payload) {
        state.templateInfo = payload
    }
}

export const actions = {
    async getAllDataSectionByPage({ commit }, payload) {
        try {
            // const response = await this.$axios.$post(`${httpEndpoint.sections.getEntries}`, payload)
            const response = await this.$axios.$get(`${httpEndpoint.sections.getEntries}`, payload)
            if (response) {
                commit("setSections", response)
            } else {
                commit("setSections", null)
            }
        } catch (e) {
            commit("setSections", null)
            console.log(e)
        }
    },

    async getSectionTemplates({ commit, rootState }) {
        try {
            const params = {
                page: 1,
                pageSize: appPagination.maximumPageSize,
                data: {
                    active: true,
                    deleted: false,
                    siteFID: rootState.site.activeSite.id
                }
            }

            const response = await this.$axios.$post(httpEndpoint.templates.getEntries, params)

            if (response) {
                const { data } = response
                if (response?.data) {
                    //console.log({templatesPara: params, templateResponse: data})
                    commit("setTemplates", data)
                } else {
                    commit("setTemplates", [])
                }
            }
        } catch (e) {
            console.log(e)
            commit("setTemplates", [])
        }
    },

    async getSectionInfo({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.sections.root}/${payload}`)
            if (response) {
                if (response) {
                    commit("setSectionInfo", response)
                    await commit("setSectionDetails", response.sectionDetails)
                    await dispatch(
                        "getSectionTemplateFields",
                        qs.stringify({
                            SectionTemplateFID: response.sectionTemplateFID
                        })
                    )
                    await dispatch("getSectionTemplateInfo", response.sectionTemplateFID)
                } else {
                    commit("setSectionInfo", null)
                }
            }
        } catch (e) {
            commit("setSectionInfo", null)
            console.log(e)
        }
    },

    async getSectionTemplateFields({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.templateFields.getByTemplateID}?${payload}`
            )
            if (response) {
                if (response) {
                    commit(
                        "setUnSavedFields",
                        response.map((f) => {
                            return {
                                id: 0,
                                templateID: f.id,
                                sectionFID: parseInt(payload.sectionFID),
                                languageFID: 1,
                                fieldName: f.fieldName,
                                fieldValue: f.defaultValue !== "" ? f.defaultValue : "",
                                contentType: f.contentType,
                                clrDataType: f.clrDataType,
                                metadata: "",
                                orderBy: 0
                            }
                        })
                    )
                    // desc order
                    commit(
                        "setTemplateFields",
                        response.sort((a, b) => {
                            if (a.orderBy > b.orderBy) {
                                return -1
                            }
                            if (a.orderBy < b.orderBy) {
                                return 1
                            }
                            return 0
                        })
                    )
                } else {
                    commit("setUnSavedFields", [])
                    commit("setTemplateFields", [])
                }
            }
        } catch (e) {
            commit("setUnSavedFields", [])
            commit("setTemplateFields", [])
            console.log(e)
        }
    },

    async getSectionTemplateInfo({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.templates.root}/${payload}`)
            console.log({ response })
            if (response) {
                commit("setTemplateInfo", response)
            }
        } catch (e) {
            commit("setTemplateInfo", [])
            console.log(e)
        }
    },

    // get existing fieldValue of this section
    async getSectionDetails({ commit }, sectionFID) {
        try {
            const params = {
                page: 1,
                pageSize: appPagination.maximumPageSize,
                data: {
                    sectionFID: sectionFID
                }
            }
            const response = await this.$axios.$post(httpEndpoint.sectionFields.getEntries, params)
            if (response) {
                const { data } = response
                if (response?.data) {
                    commit("setSectionDetails", data)
                } else {
                    commit("setSectionDetails", [])
                }
            }
        } catch (e) {
            commit("setSectionDetails", [])
            console.log({ Error: e.message })
        }
    },

    // Updated section details with fieldValue and metadata, This isn't sectionInfo
    async createSectionFields({ commit }, payload) {
        try {
            const response = await this.$axios.$post(httpEndpoint.sectionFields.bulkCreate, {
                sectionDetails: payload
            })
            if (response) {
                const { valid } = response
                return !!valid
            }
        } catch (e) {
            //console.log({ Error: e.message })
            return false
        }
    },

    async updatedSectionFields({ commit }, payload) {
        try {
            const updatedItems = await payload.map(async (field) => {
                return this.$axios.$put(httpEndpoint.sectionFields.root, {
                    id: field.id,
                    sectionFID: field.sectionFID,
                    languageFID: 1, // TODO: updated selectedLanguageFID here
                    fieldName: field.fieldName,
                    fieldValue: field.fieldValue ? field.fieldValue : "",
                    contentType: field.contentType,
                    clrDataType: field.clrDataType,
                    metadata: field.metadata,
                    orderBy: field.orderBy
                })
            })
            return await Promise.all(updatedItems)
        } catch (e) {
            console.log({ Error: e.message })
            return false
        }
    },

    async saveSectionDetails({ commit, dispatch }, payload) {
        try {
            console.log({ savePayload: payload })
            const { createdFields, updatedFields, sectionFID } = payload
            // try to create new first
            if (createdFields && createdFields.length > 0) {
                await dispatch("createSectionFields", createdFields)
                if (updatedFields && updatedFields.length > 0) {
                    await dispatch("updatedSectionFields", updatedFields)
                }
                await dispatch("getSectionInfo", sectionFID)
            } else {
                if (updatedFields && updatedFields.length > 0) {
                    const updatedReponse = await dispatch("updatedSectionFields", updatedFields)
                    if (updatedReponse.every((item) => item.success)) {
                        await dispatch("getSectionInfo", sectionFID)
                    }
                }
            }
        } catch (e) {
            console.log({ Error: e.message })
            return false
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

    async updateSectionInfomation({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(httpEndpoint.sections.root, payload)
            if (response) {
                const { valid } = response
                if (valid) {
                    await dispatch("getSectionInfo", payload.id)
                    await dispatch("app/showSnackBar", "Update section information successfully.", {
                        root: true
                    })
                }
            }
        } catch (e) {
            await dispatch("app/showSnackBar", "Update section information failed.", {
                root: true
            })
            console.log(e)
        }
    },
    async updateSectionStatus({ commit, dispatch }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.sections.setPublish}`, payload)
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
