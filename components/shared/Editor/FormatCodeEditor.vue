<template>
    <div class="editor--format-code">
        <v-skeleton-loader v-if="loading" type="image"></v-skeleton-loader>
        <textarea id="textarea-code-mirror" />
    </div>
</template>

<script>
export default {
    name: "FormatCodeEditor",
    props: {
        content: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            loading: true,
            editor: null
        }
    },
    mounted() {
        const formatHTML = html_beautify(this.content, {
            indent_size: 2
        })

        const textArea = document.getElementById("textarea-code-mirror")
        textArea.value = formatHTML

        this.$nextTick(() => {
            if (process.client) {
                this.editor = CodeMirror.fromTextArea(textArea, {
                    mode: "application/xml",
                    htmlMode: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    styleActiveLine: true,
                    lineWrapping: true,
                    tabSize: 2,
                    autofocus: true
                })
                this.editor.setCursor({ line: this.editor.lastLine() + 1, ch: 0 })
                this.loading = false
            }
        })
    },
    methods: {
        handleSubmit() {
            return this.editor.getValue()
        }
    }
}
</script>

<style lang="scss" scoped>
.editor--format-code {
    textarea {
        visibility: hidden;
        opacity: 0;
    }

    :deep(.CodeMirror) {
        .CodeMirror-scroll {
            .CodeMirror-sizer {
                margin-left: 0 !important;

                .CodeMirror-code {
                    .CodeMirror-gutter-wrapper {
                        left: 0 !important;
                    }

                    .CodeMirror-line {
                        padding-left: 3.5rem !important;
                    }
                }
            }

            .CodeMirror-gutters {
                left: 0 !important;

                .CodeMirror-linenumbers {
                    width: 3rem !important;
                }
            }
        }
    }
}
</style>
