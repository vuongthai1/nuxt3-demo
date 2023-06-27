export const state = () => ({
    domainSelected: null,
    siteSelected: null,
    campaignSelected: null
})

export const mutations = {
    setDomainSelected(state, payload) {
        state.domainSelected = payload
    },
    setSiteSelected(state, payload) {
        state.siteSelected = payload
    },
    setCampaignSelected(state, payload) {
        state.campaignSelected = payload
    }
}

export const actions = {
    updateDomainSelected({ commit }, payload) {
        commit("setDomainSelected", payload)
    },
    updateSiteSelected({ commit }, payload) {
        commit("setSiteSelected", payload)
    },
    updateCampaignSelected({ commit }, payload) {
        commit("setCampaignSelected", payload)
    }
}
