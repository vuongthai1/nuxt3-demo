<template lang="html">
    <ul :class="classNames">
        <template v-for="item in source">
            <div
                v-if="!item.subMenu"
                :class="`menu-item ${$route.path === item.url ? 'menu-item--active' : ''}`"
            >
                <!-- ${$route.path === item.url ? 'menu-item--active' : ''} -->
                <nuxt-link v-if="single" :to="item.url" :key="item.id">
                    <span>
                        <i v-if="item.icon" :class="`${item.icon} menu-item__icon`" />
                    </span>
                </nuxt-link>
                <nuxt-link v-else :to="item.url">
                    <span>
                        {{ item.text }}
                    </span>
                </nuxt-link>
            </div>
            <div
                v-else
                :class="`menu-item menu-item--has-children ${
                    activeItemID === item.id && 'menu-item--active'
                }`"
            >
                <a href="#" @click.prevent="handleOpenCollapse(item.id)">
                    <span>
                        <i :class="`${item.icon} menu-item__icon`" />
                    </span>
                </a>
                <collapse-menu :source="item.subMenu" class-names="sub-menu" :single="false" />
            </div>
        </template>
    </ul>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "CollapseMenu",
    data() {
        return {
            openSubMenu: -1,
            activeItemID: null
        }
    },
    computed: {
        ...mapState({
            sidebarCollapse: (state) => state.app.sidebarCollapse
        })
    },
    props: {
        source: {
            type: Array,
            default: () => []
        },
        classNames: {
            type: String,
            default: () => "menu--collapse"
        },
        single: {
            type: Boolean,
            default: () => true
        }
    },
    methods: {
        handleOpenCollapse(id) {
            // this.$store.commit("app/setSidebarCollapse", this.sidebarCollapse = true)
            console.log("this.classNames: ", this.classNames)
            this.activeItemID = id
            this.openSubMenu !== id ? (this.openSubMenu = id) : (this.openSubMenu = -1)
        }
    },
    mounted() {
        const path = this.$route.fullPath
        const activeItem = this.source.find(
            (item) => item.subMenu && item.subMenu.some((val) => val.url === path)
        )
        if (activeItem) {
            this.activeItemID = activeItem.id
        }
    }
}
</script>

<style lang="scss" scoped>
.menu-item {
    display: flex;
    justify-content: center;
    align-items: center;

    > a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5rem;
        width: 100%;
        color: var(--bg-menu);

        .menu-item__icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 4rem;
            height: 4rem;
            color: inherit;
            font-size: 2.6rem;
        }

        > i {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.4rem;
            height: 2.4rem;
            margin-right: 0.4rem;
        }
    }
    .accordion {
        transition-timing-function: cubic-bezier(0.195, 1.65, 0.435, -0.6);
    }

    &.menu-item--active {
        background-color: var(--bg-menu);
        color: var(--color-menu);
    }

    &.menu-item--active {
        background-color: var(--bg-menu);

        > a {
            color: var(--color-menu);
        }
    }
}

.menu-item--has-children {
    position: relative;

    .sub-menu {
        position: absolute;
        top: 0;
        left: 100%;
        @include hidden;
        padding: 0;
        background-color: #003228;
        min-width: 24rem;
        text-align: left;
        transform: scale3d(1, 1, 0);
        transition: all 0.4s ease;
        z-index: 100;
        .menu-item {
            color: var(--bg-menu);
            height: 5rem;
            font-size: 1.2rem;
            > a {
                justify-content: flex-start;
                padding: 0 1.2rem;
                font-size: 1.2rem;
                span {
                    font: inherit;
                }
                &:hover {
                    background-color: var(--color-menu);
                    color: var(--bg-menu);
                }
            }

            &.active {
                color: var(--color-menu);
                font-weight: 700;
                background-color: var(--bg-menu);
            }
        }
    }

    > span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 0.4rem;
    }

    &:hover {
        .sub-menu {
            @include show;
            transform: scale3d(1, 1, 1);
        }
    }
}

.menu--collapse {
    margin: 0;
    padding: 0;
}
</style>
