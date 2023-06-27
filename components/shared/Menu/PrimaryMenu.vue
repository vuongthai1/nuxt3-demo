<template lang="html">
    <div class="menu--sidebar">
        <template v-for="item in source">
            <div v-if="!item.subMenu" class="menu-item-submenu">
                <nuxt-link
                    :to="item.url"
                    class="menu-item"
                    :class="{ active: checkIsUrlIncludes(item) }"
                    :key="item.id"
                >
                    <span>
                        <i v-if="item.icon" :class="`${item.icon} menu-item__icon`" />
                        <span>
                            {{ item.text }}
                        </span>
                    </span>
                </nuxt-link>
            </div>
            <div v-else>
                <a
                    href="#"
                    @click.prevent="handleOpenCollapse(item.id)"
                    :class="`menu-item menu-item--has-children ${
                        activeItemID === item.id && 'active'
                    }`"
                >
                    <span>
                        <i :class="`${item.icon} menu-item__icon`" />
                        <span>
                            {{ item.text }}
                        </span>
                    </span>
                    <span class="menu-icon-right">
                        <i class="ri-arrow-down-s-line" />
                    </span>
                </a>
                <slide-up-down
                    :active="openSubMenu === item.id || activeItemID === item.id"
                    :duration="250"
                    class="wobbly-accordion sub-menu"
                >
                    <primary-menu :source="item.subMenu" />
                </slide-up-down>
            </div>
        </template>

        <!-- /.contgainer -->
    </div>
</template>

<script>
export default {
    name: "PrimaryMenu",

    data() {
        return {
            openSubMenu: -1,
            activeItemID: null,
            menuActive: false,
            pageActive: false
        }
    },
    props: {
        source: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleOpenCollapse(id) {
            if (this.activeItemID === id) {
                this.activeItemID = null
                this.openSubMenu = -1
            } else {
                this.activeItemID = id
                this.openSubMenu !== id ? (this.openSubMenu = id) : (this.openSubMenu = -1)
            }
        }
    },
    computed: {
        checkIsUrlIncludes() {
            return (item) => {
                return item === this.menuActive
            }
        },
        sectionRoute() {
            return this.$route.path().includes("/sections")
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

        const menu = this.source.filter((item) => {
            // console.log("item.url = ", item.url)
            return this.$route.fullPath.includes(item.url)
        })
        this.menuActive = menu[menu.length - 1]
    }
}
</script>

<style lang="scss" scoped>
.sub-menu {
    // padding: 1.2rem 0 1.2rem 4rem;
    .menu-item {
        height: 3.8rem;
        color: var(--bg-menu);
        padding-left: 4rem;

        &.active {
            color: var(--bg-menu);
            font-weight: 700;
            background-color: transparent;
        }
    }

    .menu-item-submenu {
        border-radius: 2rem;
        // &:first-child {
        //     padding-top: 1rem;
        // }
    }
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.4rem;
    color: var(--bg-menu);

    &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
        height: 4rem;
        color: inherit;
        font-size: 1.8rem;
    }

    .menu-icon {
        padding: 0 0.8rem;
    }

    .menu-icon-right {
        margin-right: 0.4rem;
        width: 2.4rem;
        height: 2.4rem;
    }

    > span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: inherit;
        font: inherit;
        font-size: 1.2rem;
    }

    span {
        font-size: 1.3rem;
    }

    > i {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 0.4rem;
    }

    &:hover {
        color: #fff;
        background-color: alpha(var(--color-heading), 0.8);
    }

    &.active {
        color: #fff;
        background-color: alpha(var(--color-heading), 0.8);
    }

    .accordion {
        transition-timing-function: cubic-bezier(0.195, 1.65, 0.435, -0.6);
    }
}

.menu--sidebar {
    display: grid;
    border-radius: 2rem;
}
</style>
