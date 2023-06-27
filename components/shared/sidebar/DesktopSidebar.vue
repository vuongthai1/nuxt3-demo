<template lang="html">
    <div class="sidebar">
        <div class="sidebar__inner" :class="sidebarCollapse ? 'sidebar--collapse'  : 'sidebar--primary'">
            <div class="sidebar__top">
            <logo dark />
        </div>
        <div class="sidebar__bottom">
            <primary-menu v-if="!sidebarCollapse" :source="menuItems" />
            <collapse-menu v-if="sidebarCollapse" :source="menuItems" :single="true" />
        </div>
        </div>
    </div>
</template>

<script>
import Logo from "~/components/elements/Logo"
import PrimaryMenu from "~/components/shared/Menu/PrimaryMenu.vue"
import { PRIMARY_MENU } from "~/ultilities/menus.js"
import { mapState } from "vuex"
import CollapseMenu from "~/components/shared/Menu/CollapseMenu"
export default {
    name: "DesktopSidebar",
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
    // width: fit-content;
    // padding: 2.4rem;
    .sidebar__inner {
        position: fixed;
        height: 100vh;
        
        .sidebar__top {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1.5rem;
            // min-width: 21.6rem;
        }
        .sidebar__bottom {
            // min-width: 21.6rem;
            background: #00634f;
            height: 100%;
            // border-radius: 2rem;
        }
    }

    @media screen and (max-width: 1023px) {
        display: none;
    }
}
.sidebar--primary{
    width: 21.6rem;
}
.sidebar--collapse{
    width: 10rem;
}
</style>
