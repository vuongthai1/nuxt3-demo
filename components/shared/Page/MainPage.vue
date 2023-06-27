<template lang="html">
    <section :class="`page ${sidebarCollapse ? 'collapsed' : ''}`">
        <DesktopSidebar />
        <div class="page__wrapper">
            <slot name="page-header" />
            <!-- <div class="page__content">  -->
            <slot name="page-content" />
            <!-- </div> -->
            <slot />
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex"
import DesktopSidebar from "~/components/shared/sidebar/DesktopSidebar"

export default {
    name: "MainPage",
    components: { DesktopSidebar },
    computed: {
        ...mapState({
            sidebarCollapse: (state) => state.app.sidebarCollapse
        })
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: grid;
    min-height: 100vh;
    background-color: var(--color-bg-lightgray);
    transition: all 0.4s ease;
    overflow: hidden;
    grid-template-columns: minmax(0, 21.6rem) minmax(0, 1fr);
    .page__wrapper {
        // background: var(--color-bg-lightgray);
        margin-top: 7.4rem;
        padding: 3.2rem 2.4rem 4.8rem;
    }

    @media screen and (min-width: 1440px) {
        grid-template-columns: minmax(0, 21.6rem) minmax(0, 1fr);
    }

    @media screen and (min-width: 1680px) {
        .page__wrapper {
            padding: 3.2rem 7.2rem 4.8rem;
        }
    }

    @media screen and (max-width: 767px) {
        .page__wrapper {
            display: block;
        }

        .page__content {
            padding-left: 1.6rem;
            padding-right: 1.6rem;
        }
    }
}

.collapsed {
    @media screen and (min-width: 1024px) {
        grid-template-columns: minmax(0, 10rem) minmax(0, 1fr);
    }
}
</style>
