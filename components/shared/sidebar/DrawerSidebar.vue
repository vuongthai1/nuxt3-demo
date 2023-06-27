<template lang="html">
    <div class="sidebar">
        <div class="sidebar__inner">
            <div class="sidebar__top">
            <logo dark />
        </div>
        <div class="sidebar__bottom">
            <primary-menu :source="menuItems" />
        </div>
        </div>
    </div>
</template>

<script>
import Logo from "~/components/elements/Logo"
import PrimaryMenu from "~/components/shared/Menu/PrimaryMenu"
import { PRIMARY_MENU } from "~/ultilities/menus.js"
import { mapState } from "vuex"
import CollapseMenu from "~/components/shared/Menu/CollapseMenu"
export default {
    name: "DrawerSidebar",
    components: { CollapseMenu, PrimaryMenu, Logo },
    computed: {
        ...mapState({
            sidebarCollapse: (state) => state.app.sidebarCollapse
        }),
        menuItems() {
            return PRIMARY_MENU
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    background-color: #fff;
    transition: all 0.4s ease;
    .sidebar__inner {
        position: fixed;
        .sidebar__top {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 1.6rem;
        }
    }
}
</style>
