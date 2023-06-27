<template>
    <div class="card--dialog">
        <div class="card__header">
            <h4 v-if="type === 'header' || type === 'full' || type === 'default'">{{ title }}</h4>
            <div v-else />
            <button class="btn--close" @click="onClose()">
                <i class="ri-close-fill" />
            </button>
        </div>
        <div class="card__content">
            <slot name="content"></slot>
        </div>
        <div v-if="actions" class="card__actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "DialogCard",
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
        actions: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            openCard: false
        }
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
.align-elements--between {}

.align-elements--center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.full-width {
    width: 100%;
}

.card--dialog {
    .card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.1rem 2.4rem;

        h4 {
            font-size: 1.8rem;
            margin-bottom: 0;
            font-weight: 600;
        }
    }

    .card__content {
        padding: 1.1rem 2.4rem;
        text-align: justify;
    }

    .card__footer {
        padding: 1.2rem 2.4rem;
    }

    .card__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-gap: 1.2rem;
        gap: 1.2rem;
        padding: 2.4rem;
        background-color: unset;

        >* {
            width: 12rem;
        }
    }
}

.bg-icon {
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 50%;
    background-color: alpha(var(--color-red), var(--level-1));

    i {
        color: var(--color-red);
        font-size: 2.4rem;
    }
}

.notification-text {
    p {
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--color-heading);
    }
}

.btn--close {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: none;
    width: 3.2rem;
    height: 3.2rem;
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
</style>
