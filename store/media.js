import { httpEndpoint } from "~/services/https/endpoints"

export const state = () => ({
    folderData: [],
    files: [],
    videos: [],
    fileDetails: null,
    currentFolder: null,
    parentFolder: [],
    selectedFiles: []
})
export const mutations = {
    setFolderData(state, payload) {
        state.folderData = payload
    },
    setFiles(state, payload) {
        state.files = payload
    },
    setVideos(state, payload) {
        state.videos = payload
        // console.log("state.videos::", state.videos)
    },
    setFileDetails(state, payload) {
        state.fileDetails = payload
    },
    setCurrentFolder(state, payload) {
        state.currentFolder = payload
    },
    setParentFolder(state, payload) {
        state.parentFolder = payload
    },
    setSelectedFiles(state, payload) {
        state.selectedFiles = payload
    }
}
export const actions = {
    updateFolderData({ commit }, payload) {
        commit("setFolderData", payload)
    },
    updateFiles({ commit }, payload) {
        commit("setFiles", payload)
    },
    updateCurrentFolder({ commit }, payload) {
        commit("setCurrentFolder", payload)
    },
    updateParentFolder({ commit }, payload) {
        commit("setParentFolder", payload)
    },
    async getFolderById({ commit }, params) {
        try {
            const response = await this.$api.$get(
                `${httpEndpoint.medias.getEntriesFolder}?${params}`
            )
            if (response) {
                commit("setFolderData", response)
            } else {
                commit("setFolderData", [])
            }
        } catch (e) {
            commit("setFolderData", [])
            console.log({ error: e.message })
        }
    },
    async getPictureByFolderId({ commit }, params) {
        try {
            const response = await this.$api.$get(
                `${httpEndpoint.medias.getEntriesPicture}?${params}`
            )
            if (response) {
                commit(
                    "setFiles",
                    response.data.length > 0
                        ? response.data.filter((file) => file.extension !== ".webp")
                        : []
                )
                commit("setFileDetails", response)
            } else {
                commit("setFiles", [])
                commit("setFileDetails", [])
            }
        } catch (e) {
            commit("setFiles", [])
            commit("setFileDetails", [])
            console.log({ error: e.message })
        }
    },
    async getVideosByFolderId({ commit }, params) {
        try {
            const response = await this.$api.$get(
                `${httpEndpoint.medias.getEntriesVideos}?${params}`
            )
            if (response) {
                commit("setVideos", response.datas)
            } else {
                commit("setVideos", [])
            }
        } catch (e) {
            commit("setVideos", [])
            console.log({ error: e.message })
        }
    },
    async deleteFolderByFolderId({ commit }, params) {
        try {
            await this.$api.$delete(`${httpEndpoint.medias.deleteFolder}?${params}`)
        } catch (e) {
            console.log({ error: e.message })
        }
    },

    async deletePictureByPictureId({ commit }, params) {
        console.log({ params })
        try {
            await this.$api.$delete(`${httpEndpoint.medias.deletePictures}/${params}`)
        } catch (e) {
            console.log({ error: e.message })
        }
    },
    async deleteVideoByVideoId({ commit }, params) {
        try {
            await this.$api.$delete(`${httpEndpoint.medias.deleteVideos}/${params}`)
        } catch (e) {
            console.log({ error: e.message })
        }
    },
    async createNewFolder({ commit }, params) {
        try {
            await this.$api.$post(`${httpEndpoint.medias.createFolder}`, params)
        } catch (e) {
            console.log({ error: e.message })
        }
    },
    async updateFolder({ commit }, params) {
        try {
            await this.$api.$put(`${httpEndpoint.medias.updateFolder}?${params}`)
        } catch (e) {
            console.log({ error: e.message })
        }
    }
}
