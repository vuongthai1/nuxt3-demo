import { httpEndpoint } from "~/services/https/endpoints"
// import { convertRawToSiteData } from "~/services/site-services"
import { appPagination } from "~/services/https/httpServices"
import qs from "qs"
export const state = () => ({
    allMenus: [],
    menuDetails: null,
    menuItemDetails: null,
    allMenuItems: [],
    isUpdating: false,
    isSuccess: false,
    details: null,
    error: false,
    menuParent: [], // error status, use for notification
    totalItems: null
})

export const mutations = {
    setAllMenus(state, payload) {
        state.allMenus = payload
    },
    setAllMenuItems(state, payload) {
        state.allMenuItems = payload
    },
    setMenuDetails(state, payload) {
        state.menuDetails = payload
    },
    setIsUpdating(state, payload) {
        state.isUpdating = payload
    },
    setTotalItems(state, payload) {
        state.totalItems = payload
    },
    setSuccess(state, payload) {
        state.isSuccess = payload
    },
    setDetails(state, payload) {
        state.details = payload
    },
    setMenuParent(state, payload) {
        state.menuParent = payload
    },
    setMenuItemDetails(state, payload) {
        state.menuItemDetails = payload
    }
}

export const actions = {

    async createNewMenu({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint.menus.createEntry}`, payload)
            if (response) {
                return true
            } else {
                return false
            }
            // return !!response
        } catch (e) {
            return false
        }
    },
    async updateMenu({ commit }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.menus.updateEntry}`, payload)
            if (response) {
                commit("setSuccess", true)
            } else {
                commit("setSuccess", false)
            }
        } catch (e) {
            console.log(e)
            return false
        }
    },
    async deleteMenu({ commit }, payload) {
        try {
            const response = await this.$axios.$delete(
                `${httpEndpoint.menus.trashEntry}`, payload
            )
            return !!response
        } catch (e) {
            console.log(e)
            return false
        }
    },
    async createNewMenuItem({ commit }, payload) {
        try {
            const response = await this.$axios.$post(`${httpEndpoint.menuItems.createMenuItem}`, payload)
            return !!response
        } catch (e) {
            console.log(e)
            return false
        }
    },
    async updateMenuItem({ commit }, payload) {
        try {
            const response = await this.$axios.$put(`${httpEndpoint.menuItems.updateMenuItem}`, payload)

            if (response.valid) {
                commit("setSuccess", true)
                //return true
            } else {
                commit("setSuccess", false)
            }
        } catch (e) {
            console.log(e)
            return false
        }
    },
    async deleteMenuItem({ commit }, payload) {
        try {
            const response = await this.$axios.$delete(
                `${httpEndpoint.menuItems.deleteMenuItem}`,payload
            )
            return !!response
        } catch (e) {
            console.log(e)
            return false
        }
    },
    async getDataMenuParents({ commit }, payload) {
        try {
            const responseParent = await this.$axios.$get(
                `${httpEndpoint.menuItems.getMenuParents}?menuID=${payload}`
            )
            //  console.log("muenu parents", responseParent);
            if (responseParent) {
                responseParent.unshift({
                    id: 0,
                    defaultName: "None",
                    parentID: 0

                })
                commit("setMenuParent", responseParent ? responseParent : [])
            } else {
                commit("setMenuParent", [])
            }
        } catch (e) {
            console.log(e)
            commit("setMenuParent", [])
        }
    },
    async getMenuByID({ commit }, payload) {
        try {
            const responseMenuByID = await this.$axios.$get(
                `${httpEndpoint.menus.getEntryByID}/${payload}`
            )

            if (responseMenuByID) {
                // console.log("asdresponseMenuByID", responseMenuByID);
                commit("setDetails", responseMenuByID ? responseMenuByID : {})
            }
            else {
                commit("setDetails", {})
            }
        } catch (e) {
            console.log(e);
            commit("setDetails", {})
        }

    },
    async getMenuItembyMenuID({ commit, dispatch }, payload) {
        try {
            const responseMenu = await this.$axios.$get(
                `${httpEndpoint.menuItems.getMenuItemByMenuId}?MenuID=${payload}`
            )
            if (responseMenu) {
                dispatch("getDataMenuParents", payload)
                 dispatch("getMenuByID", payload)
                commit("setAllMenuItems", responseMenu ? responseMenu : [])
            }
            else {
                commit("setAllMenuItems", [])

            }
        } catch (e) {
            commit("setAllMenuItems", [])
            console.log(e);
        }



    },
    async getAllMenus({ commit }) {
        try {
            const query = qs.stringify({
                currentPage: 1,
                pageSize: appPagination.maximumPageSize, // get all entry
            })
            const response = await this.$axios.$get(
                (`${httpEndpoint.menus.getEntries}?${query}`)
            )
            if (response) {
                console.log(response);

                commit("setAllMenus", response ? response.data : [])
                // const { data,totalPage } = response

                // if (data) {

                //     return data
                // } else {
                //     commit("setAllMenus", [])
                //     return []
                // }
            } else {
                commit("setAllMenus", [])
                return []
            }
        } catch (e) {
            commit("setAllMenus", [])
            console.log(e);
        }
    }

}
