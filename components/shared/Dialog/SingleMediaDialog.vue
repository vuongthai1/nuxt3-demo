<template>
    <v-dialog v-model="openDialog" :width="sizeDialog" persistent>
        <DialogCardAddNewAsset :title="title" @close="onClose()" :visible="activeSelect" :type="type">
            <template slot="selectedForm">
                <div class="section__header card__selectedForm">
                    <div class="section__header--title" v-if="!typeMediaDialog">
                        <span class="header-select">
                            <a :class="`${activeSelect === 'BROWER' ? 'active' : ''}`" @click="selectedForm('BROWER')">
                                BROWER
                            </a>
                        </span>
                        <span class="header-select">
                            <a :class="`${activeSelect === 'SELECTED_FILES' ? 'active' : ''}`"
                                @click="selectedForm('SELECTED_FILES')">
                                SELECTED FILES
                                <span class="item--selected" v-if="mediaSelected.length">
                                    {{ selected.length }}
                                </span>
                            </a>
                        </span>
                    </div>
                    <div style="margin-left: auto">
                        <v-btn class="btn btn--primary btn--gray btn--sm" @click="backFolderBefore" v-if="
                            media.listBeforeSelectFolder &&
                            media.listBeforeSelectFolder.length > 0
                        ">
                            <v-icon left>ri-arrow-left-circle-line</v-icon>
                            Back
                        </v-btn>
                        <v-btn class="btn btn--outline btn--blue btn--sm" @click="handleClickOpenDialogFolder()"
                            v-if="!typeMediaDialog">
                            <v-icon left>ri-add-circle-line</v-icon>
                            Add folder
                        </v-btn>
                        <v-btn class="btn btn--primary btn--green btn--sm" @click="handleClickOpenDialogAsset()">
                            <v-icon left>ri-add-circle-line</v-icon>
                            Add more assets
                        </v-btn>
                        <MediaAddFolderDialog :open="openDialogNewFolder" :size="'large'" :title="'Create new folder'"
                            :type="'full'" @close="handleClickCloseDialogFolder()">
                        </MediaAddFolderDialog>
                        <AddMoreAssetDialog :open="openAddMoreAssetDialog" :size="'large'" :title="'Upload new file'"
                            :type="'full'" @close="handleClickCloseDialogAsset()"></AddMoreAssetDialog>
                    </div>
                </div>
            </template>
            <template v-if="activeSelect === 'BROWER'">
                <template slot="search">
                    <div class="search-group">
                        <v-select :items="sortBy" value="Sort by" outlined dense hide-details style="width: 110px"
                            class="flex-grow-0" />
                        <v-text-field outlined dense hide-details placeholder="Search..."
                            prepend-inner-icon="ri-search-line" class="section-search" v-model="media.searchMedia"
                            @input="searchMediaFile" @keydown.enter.prevent="searchMediaFile" />
                    </div>
                </template>
                <MediaContentFolder :columns="columns" class="card__content--folder" slot="contentFolder" />
                <div class="card__content--items" slot="contentItems">
                    <div :class="`content__items-group ${selectedFile && selectedFile.id === item.id ? 'selected' : ''
                        }`" v-for="item in files" :key="item.id">
                        <MediaCard v-if="item" :source="item" :typeMediaDialog="typeMediaDialog"
                            @selectedFile="onSelectedFile" class="pd-6" />
                    </div>
                </div>
                <PageChange class="custom-pagination card__pagination" slot="pagination" v-if="files.length" />
                <div class="second-section--no-data" v-if="!folderData.length && !files.length" slot="contentFolder">
                    <p slot="contentItems" style="text-align: center; margin-top: 1.6rem">No data found!</p>
                    <v-btn class="btn btn--outline btn--green" @click="handleClickOpenDialogAsset()">
                        <v-icon left>ri-add-circle-line</v-icon>
                        Add new assets
                    </v-btn>
                </div>
            </template>
            <template slot="actions">
                <div class="btn-group card__footer">
                    <v-btn class="btn btn--ghost btn--red" @click="onClose()"> Cancel</v-btn>
                    <v-btn class="btn btn--primary btn--green" @click="onFinish()"> Finish</v-btn>
                </div>
            </template>
        </DialogCardAddNewAsset>
    </v-dialog>
</template>

<script>
import DialogCardAddNewAsset from "./components/DialogCardAddNewAsset"
import MediaCard from "~/components/elements/Card/MediaCard"
import AddMoreAssetDialog from "~/components/components/MediaLibrary/components/MediaDialog/AddMoreAssetDialog"
import { MEDIA, META } from "~/ultilities/contants/media"
import PageChange from "~/components/shared/PageChange/PageChange"
import { mapState } from "vuex"
import MediaContentFolder from "~/components/components/MediaLibrary/components/MediaContent/MediaContentFolder"
import MediaAddFolderDialog from "~/components/components/MediaLibrary/components/MediaDialog/MediaAddFolderDialog"
import qs from "qs"

export default {
    name: "SingleMediaDialog",
    components: {
        DialogCardAddNewAsset,
        MediaCard,
        AddMoreAssetDialog,
        PageChange,
        MediaContentFolder,
        MediaAddFolderDialog
    },
    data() {
        return {
            openDialog: false,
            openAddMoreAssetDialog: false,
            openDialogNewFolder: false,
            activeSelect: "BROWER",
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
        size: {
            type: String,
            default: "medium"
        },
        title: {
            type: String,
            default: "Default Dialog"
        },
        type: {
            type: String,
            default: "full"
        },
        typeMediaDialog: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            files: (state) => state.media.files,
            folderData: (state) => state.media.folderData,
            currentFolder: (state) => state.media.currentFolder
        }),
        sizeDialog() {
            if (this.size === "small") return 480
            if (this.size === "medium") return 640
            if (this.size === "large") return 830
        }
    },
    watch: {
        open(val) {
            this.openDialog = val
        }
    },
    methods: {
        onClose() {
            this.openDialog = false
            this.$emit("close")
        },
        onFinish() {
            if (this.selectedFile !== null) {
                this.$emit("finish", this.selectedFile)
                this.openDialog = false
            } else {
            }
        },
        selectedForm(val) {
            this.activeSelect = val
        },
        onSelectedFile(item) {
            this.selectedFile = item
        },
        handleClickOpenDialogAsset() {
            this.openAddMoreAssetDialog = true
            this.openDialog = false
        },
        handleClickCloseDialogAsset() {
            this.openAddMoreAssetDialog = false
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
            const currentFolder = qs.stringify({
                folderId: this.currentFolder && this.currentFolder.id ? this.currentFolder.id : 0,
                arrPicType: '["Original", "Small"]',
                searchString: this.media.searchMedia ? this.media.searchMedia : "",
                onlyWebp: false,
                pageIndex: 0,
                pageSize: 0
            })
            this.$store.dispatch("media/getPictureByFolderId", currentFolder)
        },
        backFolderBefore() {
            this.meta.page = 1
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
                arrPicType: '["Original","Small"]',
                onlyWebp: false,
                pageIndex: this.meta.page,
                pageSize: this.meta.pageSize
            })
            this.$store.dispatch("media/getFolderById", paramFolders)
            this.$store.dispatch("media/getPictureByFolderId", paramPicture)
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
    border: 1px solid alpha(var(--color-gray), var(--level-2));
    box-shadow: 0px 2px 4px alpha(var(--color-gray), var(--level-1));
    border-radius: 0.6rem;
    padding: 1.2rem;

    &.selected {
        border-color: transparent;
        background-color: alpha(var(--color-primary), 0.06);
    }

    // max-width: calc(50% - 12px);
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
    max-height: 30rem;
    overflow: auto;

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
</style>
