<template lang="html">
    <div>
        <div class="select--file" @click="handleOpenMediaDialog">
            <v-img
                v-if="imageURL"
                :src="imageURL"
                contain
                alt="picture"
                class="select--file__img"
                :aspect-ratio="3 / 4"
            />
            <p v-else class="empty">Click here to upload...</p>
        </div>
        <ImportFileDialog
            ref="mediaUploadFieldRef"
            :open="openMediaDialog"
            @close="openMediaDialog = false"
            :selectMultiple="false"
            @finish="handleAddImage"
            :loadingFile="loadingFile"
        />
    </div>
</template>

<script>
import ImportFileDialog from "~/components/shared/Dialog/ImportFileDialog.vue"
import { appMedia_img_url } from "~/app-settings"
import qs from "qs"
import { httpEndpoint } from "~/services/https/endpoints"

export default {
    name: "MediaUploadBox",
    components: { ImportFileDialog },
    props: {
        preview: {
            type: String,
            default: ""
        }
    },
    computed: {
        imageURL() {
            return this.thumbnailImageUrl !== ""
                ? this.thumbnailImageUrl
                : this.preview
                ? this.preview
                : ""
        }
    },
    data() {
        return {
            baseURL: appMedia_img_url.baseURL,
            thumbnailImageUrl: "",
            openMediaDialog: false,
            loadingFile: false
        }
    },

    watch: {
        preview(val) {
            this.thumbnailImageUrl = val
        }
    },
    methods: {
        async handleGetFiles() {
            this.loadingFile = true
            const paramsPicture = qs.stringify({
                pageIndex: 1,
                pageSize: 100,
                folderId: 0,
                arrPicType: '["Original"]',
                onlyWebp: false
            })
            try {
                const response = await this.$api.$get(`${httpEndpoint.medias.getEntriesFolder}`)
                const response2 = await this.$api.$get(
                    `${httpEndpoint.medias.getEntriesPicture}?${paramsPicture}`
                )
                if (response || response2) {
                    this.$store.commit("media/setFolderData", response)
                    this.$store.commit(
                        "media/setFiles",
                        response2.data.length > 0
                            ? response2.data.filter((file) => file.extension !== ".webp")
                            : []
                    )
                }
            } catch (e) {
                console.log(e)
            } finally {
                this.loadingFile = false
            }
        },
        handleAddImage() {
            this.openMediaDialog = false
            const file = this.$refs.mediaUploadFieldRef.selectedFile
            this.thumbnailImageUrl = `${this.baseURL}${file.url}`
            this.onSelectFile()
        },
        async handleOpenMediaDialog() {
            await this.handleGetFiles().then(() => {
                this.openMediaDialog = true
            })
        },
        onSelectFile() {
            this.$emit("onSelect", this.thumbnailImageUrl)
        }
    }
}
</script>
<style lang="scss" scoped>
.btn--add-field {
    padding: 0 1.2rem !important;
}

.select--file {
    background-color: alpha(var(--color-gray), var(--level-1));
    border-radius: 0.6rem;
    min-height: 9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.4rem;
    border: 1px solid transparent;
    cursor: pointer;
    max-height: 25rem;

    &__img {
        max-height: 20rem;
    }

    p {
        margin-bottom: 0;
    }
}
</style>
