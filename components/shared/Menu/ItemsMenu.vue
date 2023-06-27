<template lang="html">
    <div class="menu--items">
        <ul class="menu-item-submenu" v-for="item in listMenu">
            <li class="menu-item" :class="{ active: isActive(item), disable: item.disable }" :key="item.id">
                <nuxt-link :to="details ? `${details.id}?${item.type}` : `?${item.type}`">
                    {{ item.text }}
                    <i class="ri-arrow-right-s-line" />
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    name: "ItemsMenu",
    props: {
        listMenu: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
        }
    },

    computed: {
        ...mapState({
            details: (state) => state.site.details,
        }),
        isActive() {
            return (item) => {
                return item.type.includes(this.$route.query.type)
            }
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.menu--items {
    min-width: 36.4rem;
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 6rem;
    background: var(--color-white);
    border-radius: 0.6rem;
    cursor: pointer;

    a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.6rem;
        font-weight: 600;
        color: alpha(var(--color-gray), 0.8);
        width: 100%;
        padding: 2rem;
        border-radius: 0.6rem;
        height: 6rem;

        i {
            font-size: 1.6rem;
            font-weight: 600;
            color: alpha(var(--color-gray), 0.8);
        }

        &:active {
            color: var(--color-blue);
            background: alpha(var(--color-blue), 0.06);
        }
    }


    &:hover {

        a {
            color: var(--color-blue);
            background: var(--color-light-blue);

            i {
                color: var(--color-blue);
            }
        }

        // background: var(--color-light-blue);
    }
}

.active {

    a {
        color: var(--color-blue);
        background: alpha(var(--color-blue), 0.06);

        i {
            color: var(--color-blue);
        }
    }

    // background: alpha(var(--color-blue), 0.06);
}

.disable {
    cursor: not-allowed;

    a {
        cursor: not-allowed;
        pointer-events: none;
        color: var(--color-text);
        background: var(--color-white);

        i {
            color: var(--color-text);
        }
    }


    // background: var(--color-white);
    opacity: 0.5;

    &:hover {

        a {
            color: var(--color-text);
            background: var(--color-white);

            i {
                color: var(--color-text);
            }
        }


        // background: var(--color-white);
        opacity: 0.5;
    }
}

.v-application {
    ul {
        padding-left: 0;
        margin-bottom: 0.4rem;
    }
}
</style>
