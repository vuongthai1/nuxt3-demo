<template>
    <div class="quill-box-editor">
        <client-only>
            <quill-editor
                ref="editor"
                :content="contentEditor"
                :options="editorOption"
                @change="handleEditorChange"
            />
        </client-only>
        <div v-show="openHTMLDialog" class="dialog-html">
            <div class="dialog-html__wrap">
                <div class="dialog-html__card">
                    <div class="dialog-html__header">
                        <h4 class="dialog-html__title">Edit HTML</h4>
                        <button class="btn--close" @click="openHTMLDialog = false">
                            <i class="ri-close-fill"></i>
                        </button>
                    </div>
                    <div class="dialog-html__content">
                        <FormatCodeEditor
                            v-if="openHTMLDialog"
                            ref="formatCodeEditor"
                            :content="contentEditor"
                        />
                    </div>
                    <div class="dialog-html__actions">
                        <div class="d-flex justify-center">
                            <v-btn
                                class="btn btn--ghost btn--gray btn--sm mr-4"
                                @click="openHTMLDialog = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                class="btn btn--primary btn--green btn--sm"
                                @click.prevent="handleUpdateHTML"
                            >
                                OK
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ImportFileDialog
            ref="importFileDialog"
            :open="openMediaDialog"
            @close="openMediaDialog = false"
            :selectMultiple="false"
            @finish="handleAddImage"
            :loadingFile="loadingFile"
        />
    </div>
</template>

<script>
import qs from "qs"
import { appMedia_img_url } from "~/app-settings"
import { httpEndpoint } from "~/services/https/endpoints"
import FormatCodeEditor from "~/components/shared/Editor/FormatCodeEditor.vue"
import ImportFileDialog from "~/components/shared/Dialog/ImportFileDialog.vue"

export default {
    name: "QuillBoxEditor",
    components: { FormatCodeEditor, ImportFileDialog },
    props: {
        content: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            baseURL: appMedia_img_url.baseURL,
            openMediaDialog: false,
            openHTMLDialog: false,
            contentEditor: this.content,
            editorOption: {
                modules: {
                    toolbar: {
                        container: [
                            ["bold", "italic", "underline", "strike"],
                            ["blockquote", "code-block"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ indent: "-1" }, { indent: "+1" }],
                            [{ size: ["small", false, "large", "huge"] }],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ color: [] }, { background: [] }],
                            [{ align: [] }],
                            ["clean"],
                            ["link", "image", "video"],
                            ["html", "hr"]
                        ],
                        handlers: {
                            html: this.handleHTML,
                            hr: this.handleHR,
                            image: this.handleImage
                        }
                    }
                },
                placeholder: ""
            },
            loadingFile: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (process.client) {
                const buttonHTML = document.querySelector("button.ql-html")
                buttonHTML.innerHTML = "HTML"
                buttonHTML.style.display = "inline-block"
                buttonHTML.style.width = "auto"
                const buttonHR = document.querySelector("button.ql-hr")
                buttonHR.innerHTML = "hr"
                buttonHR.style.display = "inline-block"
                buttonHR.style.width = "auto"
            }
        })
    },
    methods: {
        handleEditorChange({ html }) {
            this.contentEditor = html
            this.$emit("change", this.contentEditor)
        },
        async handleGetMedias() {
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
        handleImage() {
            this.openMediaDialog = true
            this.handleGetMedias()
        },
        handleAddImage() {
            this.openMediaDialog = false
            const file = this.$refs.importFileDialog.selectedFile
            const imageURL = `${this.baseURL}${file.url}`

            const quill = this.$refs.editor.quill
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, "image", imageURL)
        },
        handleHTML() {
            this.openHTMLDialog = true
        },
        handleUpdateHTML() {
            this.contentEditor = this.$refs.formatCodeEditor.handleSubmit()
            this.openHTMLDialog = false
        },
        handleHR() {
            const quill = this.$refs.editor.quill
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, "hr", "null")
        }
    }
}
</script>

<style lang="scss" scoped>
.dialog-html {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 45;
    background-color: rgba(33, 33, 33, 0.46);
    display: flex;
    justify-content: center;
    align-items: center;

    &__wrap {
        width: 83rem;
        padding: 2.4rem;
    }

    &__card {
        background-color: var(--color-white);
        border-radius: 1.6rem;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.1rem 2.4rem;
    }

    &__title {
        font-size: 1.8rem;
        margin-bottom: 0;
        font-weight: 600;
    }

    &__content {
        padding: 1.1rem 2.4rem;
        text-align: justify;
    }

    &__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-gap: 1.2rem;
        grid-gap: 1.2rem;
        gap: 1.2rem;
        padding: 2.4rem;
    }
}
</style>
