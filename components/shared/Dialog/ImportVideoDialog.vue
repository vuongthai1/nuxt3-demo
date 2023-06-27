<template>
    <div class="dialog--import-file">
        <v-dialog v-model="openDialog" :width="840" persistent v-if="openDialog">
            <DialogCardAddNewAsset :title="title" @close="onClose">
                <template slot="selectedForm">
                    <div class="section__header card__selectedForm">
                        <div style="margin-left: auto">
                            <v-btn class="btn btn--primary btn--gray btn--sm" @click="backFolderBefore" v-if="
                                media.listBeforeSelectFolder &&
                                media.listBeforeSelectFolder.length > 0
                            ">
                                <v-icon left>ri-arrow-left-circle-line</v-icon>
                                Back
                            </v-btn>
                            <v-btn class="btn btn--outline btn--blue btn--sm" @click="handleClickOpenDialogFolder()"
                                v-if="!selectMultiple">
                                <v-icon left>ri-add-circle-line</v-icon>
                                New folder
                            </v-btn>
                            <v-btn class="btn btn--primary btn--green btn--sm" @click="handleClickOpenDialogAsset()">
                                <v-icon left>ri-add-circle-line</v-icon>
                                Upload more videos
                            </v-btn>
                        </div>
                    </div>
                </template>
                <template slot="search">
                    <div class="search-group">
                        <v-text-field outlined dense hide-details placeholder="Search..."
                            prepend-inner-icon="ri-search-line" class="section-search" v-model="media.searchMedia"
                            @change="searchMediaFile">
                        </v-text-field>
                    </div>
                </template>
                <template slot="contentFolder">
                    <MediaContentVideoFolder2 :columns="columns" class="card__content--folder" />
                    <div class="card__content--items" slot="contentItems">
                        <div class="item-container" v-for="item in videos" :key="item.id">
                            <MediaVideoCard v-if="item" :source="item" :multiple="selectMultiple" :selected="
                                selectMultiple
                                    ? selectedFiles &&
                                    selectedFiles.find((f) => f.id === item.id) !== undefined
                                    : selectedFile && selectedFile.id === item.id
                            " @selectedFile="onSelectedFile" @selectedMultiple="handleSelect" class="pd-6" />
                        </div>
                    </div>
                </template>
                <div class="second-section--no-data" v-if="!folderData.length && !videos.length" slot="contentFolder">
                    <p slot="contentItems" style="text-align: center; margin-top: 1.6rem">No data found!</p>
                    <v-btn class="btn btn--outline btn--green" @click="handleClickOpenDialogAsset()">
                        <v-icon left>ri-add-circle-line</v-icon>
                        Add new videos
                    </v-btn>
                </div>

                <template slot="actions">
                    <div class="btn-group card__footer">
                        <v-btn class="btn btn--primary btn--gray" @click="onClose()"> Cancel</v-btn>
                        <v-btn class="btn btn--primary btn--green"
                            @click="selectMultiple ? onFinishSelectedMultiple() : onFinish()">
                            Select video{{ selectMultiple ? "s" : "" }}
                        </v-btn>
                    </div>
                </template>
            </DialogCardAddNewAsset>
        </v-dialog>
        <MediaContentVideoFolder :open="openDialogNewFolder" :size="'large'" :title="'Create new folder'" :type="'full'"
            @close="handleClickCloseDialogFolder()">
        </MediaContentVideoFolder>
        <AddMoreVideoDialog :open="openAddMoreVideoDialog" :size="'large'" :title="'Upload new file'" :type="'full'"
            @close="handleClickCloseDialogAsset()"></AddMoreVideoDialog>
    </div>
</template>

<script>
import DialogCardAddNewAsset from "./components/DialogCardAddNewAsset"
import MediaVideoCard from "~/components/elements/Card/MediaVideoCard.vue"
import AddMoreVideoDialog from "~/components/components/MediaLibraryVideos/components/MediaDialog/AddMoreVideoDialog.vue"
import { MEDIA, META } from "~/ultilities/contants/media"
import PageChange from "~/components/shared/PageChange/PageChange.vue"
import { mapState } from "vuex"
import MediaContentVideoFolder2 from "~/components/components/MediaLibraryVideos/components/MediaContent/MediaContentVideoFolder2.vue"
import MediaContentVideoFolder from "~/components/components/MediaLibraryVideos/components/MediaContent/MediaContentVideoFolder.vue"
import qs from "qs"

export default {
    name: "ImportVideoDialog",
    components: {
        DialogCardAddNewAsset,
        MediaVideoCard,
        AddMoreVideoDialog,
        PageChange,
        MediaContentVideoFolder2,
        MediaContentVideoFolder
    },
    computed: {
        ...mapState({
            videos: (state) => state.media.videos,
            folderData: (state) => state.media.folderData,
            currentFolder: (state) => state.media.currentFolder,
            selectedFiles: (state) => state.media.selectedFiles
        })
    },
    data() {
        return {
            openDialog: false,
            openAddMoreVideoDialog: false,
            openDialogNewFolder: false,
            // activeSelect: "BROWER",
            sortBy: ["Sort by"],
            mediaSelected: MEDIA.mediaSelected,
            media: MEDIA,
            meta: META,
            pageSize: [10, 20, 30, 40, 50],
            pageSelected: 1,
            columns: "media_dialog",
            selectedFile: null
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: "Select video"
        },

        selectMultiple: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        open(val) {
            this.openDialog = val
        }
    },
    methods: {
        handleSelect(item) {
            this.mediaSelected =
                this.mediaSelected.find((file) => item.id === file.id) !== undefined
                    ? this.mediaSelected.filter((file) => file.id !== item.id)
                    : [...this.mediaSelected, item]
            this.$store.commit("media/setSelectedFiles", this.mediaSelected)
        },

        onClearData() {
            this.meta.page = 1
            this.meta.pageSize = 100
            this.media.listBeforeSelectFolder = []
            this.$store.commit("media/setCurrentFolder", {})
            this.selectedMultipleFile = []
            this.mediaSelected = []
            this.openDialog = false
        },

        onClose() {
            this.onClearData()
            this.$store.commit("media/setSelectedFiles", [])
            this.$emit("close")
        },

        onFinish() {
            this.onClearData()
            this.$store.commit("media/setSelectedFiles", [])
            this.$emit("finish")
        },

        onFinishSelectedMultiple() {
            this.onClearData()
            this.$store.commit("media/setSelectedFiles", [])
            this.mediaSelected = []
            this.$emit("selectedMultiple")
        },

        // selectedForm(val) {
        //     this.activeSelect = val
        // },
        onSelectedFile(item) {
            this.selectedFile = item
            // console.log("Video selected", item)
        },
        handleClickOpenDialogAsset() {
            this.openAddMoreVideoDialog = true
            this.openDialog = false
        },
        handleClickCloseDialogAsset() {
            this.openAddMoreVideoDialog = false
            this.openDialog = true
        },
        handleClickOpenDialogFolder() {
            this.openDialogNewFolder = true
            this.openDialog = false
        },
        handleClickCloseDialogFolder() {
            this.openDialogNewFolder = false
            this.openDialog = true
        },
        searchMediaFile() {
            if (this.media.searchMedia) {
                const files = this.videos.filter((file) =>
                    file.fileName.includes(this.media.searchMedia)
                )
                this.$store.commit("media/setVideos", files)
            } else {
                this.meta.page = 1
                this.meta.pageSize = 100
                const currentFolder = qs.stringify({
                    folderId:
                        this.currentFolder && this.currentFolder.id ? this.currentFolder.id : 0,
                    searchString: this.media.searchMedia ? this.media.searchMedia.trim() : "",
                    pageIndex: this.meta.page,
                    pageSize: this.meta.pageSize
                })
                this.$store.dispatch("media/getVideosByFolderId", currentFolder)
            }
        },
        backFolderBefore() {
            this.meta.page = 1
            // this.meta.pageSize = 10
            this.meta.pageSize = 100
            const backFolderBefore = this.media.listBeforeSelectFolder.pop()
            const currentFolderBack = this.media.listBeforeSelectFolder.slice(-1).pop()
            const paramFolders = qs.stringify({
                parentId:
                    backFolderBefore && backFolderBefore.parentId ? backFolderBefore.parentId : 0
            })
            const paramPicture = qs.stringify({
                folderId:
                    backFolderBefore && backFolderBefore.parentId ? backFolderBefore.parentId : 0,
                pageIndex: this.meta.page,
                pageSize: this.meta.pageSize
            })
            this.$store.dispatch("media/getFolderById", paramFolders)
            this.$store.dispatch("media/getVideosByFolderId", paramPicture)
            this.$store.commit("media/setCurrentFolder", currentFolderBack)
        }
    }
}
</script>

<style lang="scss" scoped>
.second-section {
    padding: 2.4rem 0;

    &--no-data {
        min-height: 10rem;
        text-align: center;
        // margin-top: 20rem;

        h2 {
            font-weight: 600;
            line-height: 100%;
            color: alpha(var(--color-gray), 0.6);
            margin-bottom: 2.4rem;
        }
    }
}

.card__selectedForm {
    border-top: 1px solid alpha(var(--color-gray), var(--level-1));
    border-bottom: 1px solid alpha(var(--color-gray), var(--level-1));
    padding: 1.1rem 2.4rem;
    text-align: justify;
}

.v-dialog {
    box-shadow: 0px 34px 100px alpha(var(--color-gray), 0.18);
    border-radius: 1.6rem;
    background-color: #fff;
}

.section-search {
    max-width: calc(100% / 3);
}

.btn-group {
    flex-flow: row nowrap;
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-gap: 1.2rem;
    gap: 1.2rem;

    .btn {
        max-width: 12rem;
    }
}

.section__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--title {
        display: flex;

        span a {
            display: block;
            margin: 1rem 1rem 1rem 0;
            padding-bottom: 1rem;
            position: relative;
            font-weight: 500;
            color: rgba(93, 101, 115, 0.8);

            &.active {
                color: var(--color-primary);
            }
        }

        span a.active:after {
            content: "";
            position: absolute;
            font-weight: 500;
            width: 100%;
            background: var(--color-primary);
            color: rgba(93, 101, 115, 0.8);
            height: 3px;
            bottom: 0;
            left: 0;
            transition: 0.25s ease;
        }

        .header-select {
            display: flex;
            align-items: center;
        }

        .item--selected {
            background-color: var(--color-bg-gray);
            border-radius: 0.2rem;
            padding: 0 0.6rem;
        }
    }
}

.search-group {
    padding: 1.2rem 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.content__items-group {
    display: flex;
    justify-content: space-between;
}

.custom-pagination {
    padding: 0 0.6rem;
    width: -webkit-fill-available;
}

.btn-group>.btn {
    border-radius: 0.8rem !important;
}

.card__content--items {
    padding: 1.2rem 2.4rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem;
    flex-wrap: wrap;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
        background: #e6e6e6;
        border-left: 1px solid #dadada;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--color-primary);
        border: solid 1px #e6e6e6;
        border-radius: 1rem;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: black;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
}

.card__content--folder {
    padding: 1.2rem 2.4rem;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.2rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}

.card__footer {
    background-color: var(--color-bg-gray);
    padding: 1.2rem 2.4rem;

    .btn-group {
        justify-content: space-between;
    }
}

.card__pagination {
    padding: 1.2rem 1.8rem;
    display: flex;
}

.check-box__media {
    width: 2rem;
    margin-left: auto;
}
</style>
