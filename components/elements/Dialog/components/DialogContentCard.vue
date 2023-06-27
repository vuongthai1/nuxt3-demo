<template>
    <div class="card--dialog">
        <div class="card__header">
            <button class="btn--close" @click="onClose()">
                <i class="ri-close-fill" />
            </button>
        </div>
        <div class="card__container">
            <div class="card__icon">
                <slot name="icon" />
            </div>
            <div class="card__content">
                <slot name="content" />
            </div>
        </div>
        <div class="card__actions">
            <slot name="actions" />
        </div>
    </div>
</template>
<script>
export default {
    name: "DialogContentCard",
    props: {
        open: {
            type: Boolean,
            default: false
        },
        action: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            openCard: false
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
    .card__header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-top: 1px solid alpha(var(--color-gray), var(--level-1));
        padding: 1.2rem 2.4rem 2.4rem;

        h4 {
            font-size: 1.8rem;
            margin-bottom: 0;
            font-weight: 600;
        }
    }

    .card__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 3.6rem;
    }

    .card__content {
        padding: 0 2.4rem 2.4rem;
        text-align: center;

        p {
            margin-bottom: 0;
            font-weight: 400;
            line-height: 1.6em;
            font-size: 1.4rem;

            strong {
                display: block;
                font-weight: 500;
                font-size: 1.6rem;
                color: var(--color-heading);
            }
        }
    }

    .card__actions {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-gap: 1.2rem;
        gap: 1.2rem;
        padding: 2.4rem;
        background-color: unset;

        > * {
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
