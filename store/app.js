export const state = () => ({
    appDrawer: false,
    token: null,
    appLoading: false,
    appLoadingMessage: "Loading...",
    sidebarCollapse: false,
    createNewUserEditForm: false,
    snackBar: {
        show: false,
        message: ""
    }
})

export const mutations = {
    setAppDrawer(state, payload) {
        state.appDrawer = payload
    },

    setToken(state, payload) {
        state.token = payload
    },

    setSidebarCollapse(state, payload) {
        state.sidebarCollapse = payload
    },

    setSnackBar(state, payload) {
        state.snackBar = payload
    }
}

export const actions = {
    async showSnackBar({ commit }, payload) {
        commit("setSnackBar", {
            show: true,
            message: payload
        })
        setTimeout(() => {
            commit("setSnackBar", {
                show: false,
                message: ""
            })
        }, 2500)
    }
}
