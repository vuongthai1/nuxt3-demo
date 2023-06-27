import { httpEndpoint } from "~/services/https/endpoints"
import { appPagination, enabledEntriesParams } from "~/services/https/httpServices"
import qs from "qs"

const initialCategoryDetail = {
    id: 0,
    siteFID: 0,
    categoryParentFID: 0,
    name: "",
    slug: "",
    orderBy: 0,
    isMultilingual: false,
    active: false,
    deleted: false,
    blogCategoryDetails: "",
    mappings: ""
}

export const state = () => ({
    blog: null,
    allEntries: null,
    createEntries: null,
    deleteEntry: null,
    createBlogCategories: null,
    allCategories: null,
    categories: [],
    categoryDetail: null,
    blogDetail: null,
    statusUpdate: false
})

export const mutations = {
    setBlog(state, payload) {
        state.blog = payload
    },
    setAllEntries(state, payload) {
        state.allEntries = payload
    },
    setCreateEntries(state, payload) {
        state.createEntries = payload
    },
    setDeleteEntry(state, payload) {
        state.deleteEntry = payload
    },
    setCreateBlogCategories(state, payload) {
        state.createBlogCategories = payload
    },
    setAllCategories(state, payload) {
        state.allCategories = payload
    },
    setBlogDetail(state, payload) {
        state.blogDetail = payload
    },
    setCategories(state, payload) {
        state.categories = payload
    },
    resetCategoryDetail(state) {
        state.categoryDetail = initialCategoryDetail
    },
    setCategoryDetail(state, payload) {
        // console.log("setCategoryDetail", payload)
        state.categoryDetail = payload
    }
}

export const actions = {
    async updateBlogItem({ commit }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.blogs.updateBlogItem}`, payload)
            return true
        } catch (e) {
            console.log({ error: e.message })
        }
    },

    async getBlogDetails({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.blogs.root}/${payload}`)
            if (response) {
                commit("setBlogDetail", response)
            }
        } catch (e) {
            commit("setBlogDetail", null)
        }
    },

    async getListEntries({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.blogs.getEntries}`, {
                params: payload
            })
            if (response.data) {
                commit("setAllEntries", response)
            }
        } catch (e) {
            commit("setAllEntries", null)
            console.log({ error: e.message })
        }
    },

    async getAllEntries({ commit }, payload) {
        try {
            const response = await this.$axios.$get(`${httpEndpoint.blogs.getEntries}?${payload}`)

            if (response) {
                commit("setAllEntries", response)
            }
        } catch (e) {
            commit("setAllEntries", null)
            console.log({ error: e.message })
        }
    },
    async createNewEntry({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint.blogs.createEntry}`, payload)

            if (response) {
                this.$router.push(`/blog/${response.id}`)
            }
        } catch (e) {
            commit("setBlog", null)
            console.log({ error: e.message })
        }
    },
    async duplicateNewEntry({ commit }, payload) {
        try {
            await this.$axios.$post(`${httpEndpoint.blogs.createEntry}`, payload)
        } catch (e) {
            commit("setBlog", null)
            console.log({ error: e.message })
        }
    },

    async trashEntry({ commit, dispatch, rootState }, payload) {
        try {
            const response = await this.$axios.$delete(`${httpEndpoint.blogs.root}`, {
                data: {
                    id: payload
                }
            })
            const params = {
                siteFID: rootState.site.activeSite.id,
                CurrentPage: 1,
                pageSize: appPagination.defaultPageSize,
                Deleted: false
            }
            await dispatch("getAllEntries", qs.stringify(params))
            return !!response.valid
        } catch (e) {
            commit("setAllEntries", null)
        }
    },

    async createCategories({ commit }, payload) {
        try {
            const response = await this.$axios.$post(
                `${httpEndpoint.blogs.createBlogCategories}`,
                payload
            )
            // console.log("createCategories response",response);
            if (response.valid) {
                commit("setCreateBlogCategories", response)
                return true
            } else {
                commit("setCreateBlogCategories", null)
                return false
            }
        } catch (e) {
            commit("setCreateBlogCategories", null)
            console.log({ error: e.message })
        }
    },

    async getCategories({ commit }, payload) {
        try {
            const response = await this.$axios.$get(
                `${httpEndpoint.blogs.getBlogCategoriesEntries}?${payload}`
            )
            if (response) {
                commit("setCategories", response)
            } else {
                commit("setCategories", [])
            }
        } catch (e) {
            console.log({ error: e.message })
            commit("setCategories", [])
        }
    },
    async updateCategoryByID({ commit }, payload) {
        try {
            await this.$axios.$put(`${httpEndpoint.blogs.updateBlogCategoriesByID}`, payload)
        } catch (e) {
            console.log({ error: e.message })
        }
    },
    async deleteCategoriesByID({ commit }, payload) {
        console.log("deleteCategoriesByID payload", payload)
        try {
            await this.$axios.$delete(`${httpEndpoint.blogs.deleteBlogCategoriesByID}`, payload)
        } catch (e) {
            console.log({ error: e.message })
        }
    }
}
