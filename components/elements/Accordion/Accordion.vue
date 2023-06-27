<template>
    <div :class="`accordion ${open && 'expanded'}`">
        <div class="accordion__header" @click.prevent="onToggle">
            <template v-if="number">
                <div class="accordion__left">
                    <span class="accordion__number">
                        {{ number }}
                    </span>
                    <h4>{{ heading }}</h4>
                </div>
            </template>
            <template v-else>
                <h4>{{ heading }}</h4>
            </template>
            <v-btn v-if="!lock" @click.prevent="onToggle" class="btn btn--icon">
                <i v-if="!open" class="ri-arrow-down-s-line" />
                <i v-else class="ri-arrow-up-s-line" />
            </v-btn>
        </div>
        <slide-up-down :active="open" :duration="250">
            <div class="accordion__container">
                <slot />
            </div>
        </slide-up-down>
    </div>
</template>

<script>
export default {
    name: "Accordion",
    props: {
        heading: {
            type: String,
            default: "Accordion"
        },
        open: {
            type: Boolean,
            default: false
        },
        lock: {
            type: Boolean,
            default: false
        },
        number: {
            type: Number,
            default: 0
        }
    },

    methods: {
        onToggle() {
            this.$emit("toggle")
        },
        toggleExpanded() {
            // console log
            this.$emit("toggle")
        }
    }
}
</script>

<style lang="scss" scoped>
.accordion {
    border-radius: 1.6rem;
    overflow: hidden;
    border: 1px solid transparent;

    .accordion__left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    &__header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 3.2rem;
        grid-gap: 1.2rem;
        background-color: #f7f7f9;
        padding: 0 2.4rem;
        height: 6rem;
        cursor: pointer;
        h4 {
            margin-bottom: 0;
            font-weight: 600;
            font-size: 1.6rem;
            align-self: center;
        }

        .btn--icon {
            transform: translateX(50%);
            align-self: center;
        }
    }

    &__container {
        padding: 2.4rem;
        background-color: var(--color-white);
    }
}

.expanded {
    border: 1px solid alpha(var(--color-gray), 0.1);

    &--border {
    }

    &--padding {
        padding-top: 1.2rem;
        padding-bottom: 5.7rem;
    }
}
</style>
