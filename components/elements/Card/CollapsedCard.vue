<template lang="html">
    <div class="card--collapsed">
        <div class="card__top">
            <p> {{ title }}</p>
            <div class="card__actions">
                <!-- <slot name="header"></slot> -->
                <!-- <nuxt-link :to="`/blog/categories/${item.id}`" class="btn btn--icon btn--blue" icon>
                    <i class="ri-edit-2-line" />
                </nuxt-link> -->
                <v-btn class="btn btn--icon" icon @click="expand = !expand">
                    <i v-if="expand" class="ri-arrow-up-s-line" />
                    <i v-else class="ri-arrow-down-s-line" />
                </v-btn>
                <!-- <v-btn class="card__toggleBtn card__toggleBtn--delete" icon>
                    <i class="ri-delete-bin-5-line"/>
                </v-btn> -->
            </div>
        </div>
        <slide-up-down :active="expand" class="accordion" :duration="200">
            <div class="card__wrapper">
                <slot />
            </div>
        </slide-up-down>
    </div>
</template>

<script>
export default {
    name: "CollapsedCard",
    props: {
        title: {
            type: String,
            default: () => "Card Name"
        },
        checkExistChild: {
            type: Boolean,
            default: () => true
        },
        item: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            expand: false
        }
    }
}
</script>

<style lang="scss" scoped>
.card--collapsed {
    background-color: var(--color-bg-gray);
    border-radius: 0.8rem;

    .card__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        grid-gap: 0.8rem;
        gap: 0.8rem;
    }

    .card__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4.8rem;
        padding: 0 1.6rem;

        p {
            margin: 0;
            font-size: 1.4rem;
            font-weight: 500;
            color: var(--color-heading);
        }
    }

    .card__toggleBtn {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;

        i {
            font-size: 1.6rem !important;
            color: var(--color-heading);
        }
    }

    .card__toggleBtn--edit {
        background-color: alpha(var(--color-blue), var(--level-1));
        color: var(--color-blue);

        i {
            color: var(--color-blue);
        }
    }

    .card__toggleBtn--delete {
        background-color: alpha(var(--color-danger), var(--level-1));
        color: var(--color-danger);

        i {
            color: var(--color-danger);
        }
    }
}
</style>
