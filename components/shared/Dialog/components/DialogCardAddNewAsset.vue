<template>
    <div class="card--dialog">
        <div class="card__header">
            <h4>{{ title }}</h4>
            <button class="btn--close" @click="onClose()">
                <i class="ri-close-fill" />
            </button>
        </div>
        <slot />
        <div class="card__content">
            <div>
                <slot name="selectedForm"></slot>
            </div>
            <div>
                <slot name="search"></slot>
            </div>
            <div>
                <slot name="contentFolder"></slot>
            </div>
            <div>
                <slot name="contentItems"></slot>
            </div>
            <div>
                <slot name="contentItemsSelected"></slot>
            </div>

            <div>
                <slot name="pagination"></slot>
            </div>
        </div>
        <div v-if="type === 'footer' || type === 'full'">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "DialogCardAddNewAsset",
    props: {
        title: {
            type: String,
            default: "Dialog title"
        },
        type: {
            type: String,
            default: "full"
        },
        open: {
            type: Boolean,
            default: false
        },
        visible: {
            type: String,
            default: "BROWER"
        }
    },
    data() {
        return {}
    },
    computed: {
        sizeDialog() {
            if (this.size === "small") return 480
            if (this.size === "medium") return 640
            if (this.size === "large") return 830
        }
    },
    methods: {
        onClose() {
            this.$emit("close")
        }
    }
}
</script>

<style lang="scss" scoped>
.card--dialog {
    // position: relative;
    .card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.1rem 2.4rem;
        border-top: 1px solid alpha(var(--color-gray), var(--level-1));

        h4 {
            font-size: 1.8rem;
            margin-bottom: 0;
            font-weight: 600;
        }
    }
}

.btn--close {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: none;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    transition: all 0.4s ease;
    position: relative;
    left: 1.74rem;

    &:hover,
    &:focus {
        background-color: alpha(var(--color-red), var(--level-1));

        i {
            color: var(--color-red);
        }
    }

    i {
        font-size: 2rem;
    }
}

.card__content {
    max-height: 55rem;
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
</style>
