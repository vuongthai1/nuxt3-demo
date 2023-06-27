<template>
    <div :class="`card--image ${classes}`" v-if="source" @click="handleSelectFile(source)">
        <!-- <img src="~/static/img/images-video.png" :alt="source.source" /> -->
        <i class="ri-movie-line"></i>
        <div class="card__select">
            <div class="card__container">
                <div class="card__content">
                    <span :title="`${source.fileName}`">{{ source.fileName }}</span>
                    <p>
                        {{ dimensions }}
                    </p>
                </div>
            </div>
            <div class="card__actions" v-if="multiple">
                <v-checkbox hide-details v-model="checkSelected" color="#00634F" @change="onSelectMultipleFile" />
            </div>
        </div>
    </div>
</template>
<script>
import { appMedia_img_url } from "~/app-settings"
import { FORM_CREATE_BLOG } from "~/ultilities/contants/blog-management.js"
export default {
    name: "MediaVideoCard",
    props: {
        source: {
            type: Object,
            default: () => { }
        },
        multiple: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes() {
            let classNameArr = []
            if (this.multiple) {
                classNameArr.push("card--multiple")
            }
            if (this.selected) {
                classNameArr.push("card--selected")
            }
            return classNameArr.join(" ")
        },

        dimensions() {
            return `${this.source.extension.replace(".", "").toUpperCase()}`
        }
    },
    watch: {
        // selected(val) {
        //     this.currentSelected = val
        // }
    },

    data() {
        return {
            formCreateBlog: FORM_CREATE_BLOG,
            baseURL_Img: appMedia_img_url.baseURL,
            // currentSelected: false,
            checkSelected: this.selected ? this.selected : false
        }
    },

    methods: {
        handleSelectFile(item) {
            this.$emit("selectedFile", item)
            if (item) {
                this.formCreateBlog.blogImg = `${this.baseURL_Img}${item.url} `
                this.formCreateBlog.blogImgEditor = `${this.baseURL_Img}${item.url} `
            }
        },

        onSelectMultipleFile(e) {
            this.$emit("selectedMultiple", this.source)
        }
    }
}
</script>
<style lang="scss" scoped>
.card--image {
    display: flex;
    // te-columns: 6.4rem minmax(0, 1fr);
    // grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 0.8rem;
    cursor: pointer;
    width: 100%;
    border: 1px solid alpha(var(--color-gray), var(--level-2));
    box-shadow: 0 2px 4px alpha(var(--color-gray), var(--level-1));
    border-radius: 0.4rem;
    padding: 1.2rem;
    margin: 1px;

    i {
        font-size: 4rem
    }

    img {
        // width: 6.4rem;
        width: 100%;
        height: 7.5rem;
        object-fit: cover;
        background-color: var(--color-bg-gray);
        border-radius: 0;
    }

    .btn {
        margin-left: auto;
    }

    .card__content {
        grid-column: span 2 / span 2;
        padding-left: 1.2rem !important;
        max-width: 40rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        span {
            font-size: 14px;
            font-weight: 500;
        }

        p {
            font-size: 12px;
            font-weight: 400;
        }
    }

    .card__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        visibility: hidden;
        opacity: 0;

        &::v-deep(.v-input) {
            margin-top: 0;
        }
    }

    .card__select {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .card__container {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 4.8rem;
        // grid-gap: 0.4rem;

        .card__actions {
            align-self: start;
        }
    }

    &:hover,
    &:focus {
        cursor: pointer;

        .card__actions {
            visibility: visible;
            opacity: 1;
        }
    }

    &.card--multiple {
        .card__actions {
            visibility: visible;
            opacity: 1;
        }
    }

    &.card--selected {
        background-color: #fff;
        //color: var(--color-text-primary);
        border-color: var(--color-primary);
        border-width: 1px;

        .card__content {
            >span {
                color: var(--color-primary);
            }
        }

        .card__actions {
            visibility: visible;
            opacity: 1;
        }
    }
}

.card--multiple {
    cursor: inherit !important;
}

.check-box__media {
    width: 2rem;
    margin-left: auto;
}
</style>
