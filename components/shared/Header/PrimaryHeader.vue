<template lang="html">
    <header
        class="header--dashboard"
        :class="sidebarCollapse ? 'width--collapse' : 'width--normal'"
    >
        <div class="header__left">
            <div class="header__collapse">
                <v-btn
                    icon
                    class="collapse-btn"
                    fab
                    dark
                    small
                    elevation="0"
                    @click.prevent="handleToggleSidebar"
                >
                    <i class="ri-menu-line" />
                </v-btn>
            </div>

            <div v-if="!isEditing" class="font-weight-medium" style="white-space: nowrap"
                >Selected domain:</div
            >
            <div class="header__site">
                <v-select
                    v-if="!isEditing"
                    v-model="selectedSiteID"
                    :items="publishedEntries"
                    item-text="siteName"
                    item-value="id"
                    dense
                    hide-details
                    outlined
                    @change="changeSite()"
                />
            </div>

            <!-- <div class="header__page-info">
                <h4 class="page-name">{{ pageName }}</h4>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item" v-for="(item, index) in pageDesc" :key="index">
                        {{ item.pageItem }}
                    </li>
                </ol>
            </div> -->
        </div>
        <div class="header__right">
            <HeaderMenu />
            <HeaderUser />
        </div>
        <v-navigation-drawer
            v-if="$vuetify.breakpoint.width <= 1023"
            class="drawer"
            v-model="sidebarCollapse"
            absolute
            left
            temporary
        >
            <drawer-sidebar />
        </v-navigation-drawer>
    </header>
</template>

<script>
import HeaderUser from "~/components/shared/headers/modules/HeaderUser.vue"
import { mapState } from "vuex"
import DrawerSidebar from "~/components/shared/sidebar/DrawerSidebar"
import HeaderMenu from "~/components/shared/Header/components/HeaderMenu.vue"

export default {
    name: "PrimaryHeader",
    components: { DrawerSidebar, HeaderUser, HeaderMenu },
    computed: {
        ...mapState({
            sidebarCollapse: (state) => state.app.sidebarCollapse,
            publishedEntries: (state) => state.site.publishedEntries,
            activeSite: (state) => state.site.activeSite
        }),
        isEditing() {
            const id = this.$route.params.id
            return !!id
        }
    },
    props: {
        pageName: {
            type: String,
            default: () => "Dashboard"
        },
        pageDesc: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            selectedSiteID: null
        }
    },

    created() {
        this.selectedSiteID = this.activeSite
    },

    mounted() {
        this.hiddenToggleSidebar()
    },

    methods: {
        hiddenToggleSidebar() {
            if (window.matchMedia("(max-width: 1179px)").matches) {
                this.$store.commit("app/setSidebarCollapse", true)
            }
        },
        handleToggleSidebar() {
            this.$store.commit("app/setSidebarCollapse", !this.sidebarCollapse)
        },
        changeSite() {
            // console.log("this.selectedSiteID", this.enabledSites.find((item) => item.id === this.selectedSiteID))
            //const siteIdCookie = this.$cookies.get("siteId")
            this.$store.commit(
                "site/setActiveSite",
                this.publishedEntries.length
                    ? this.publishedEntries.find((item) => item.id === this.selectedSiteID)
                    : null
            )
            console.log({ selectedSiteID: this.selectedSiteID })
            this.$cookies.set("siteId", `${this.selectedSiteID}`, {
                path: "/",
                maxAge: 60 * 60 * 24 * 30
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.collapse-btn {
    // background-color: #fff;
    font-size: 1.8rem;
    color: var(--color-1st);
    border-radius: 5px 0 0 5px;

    i {
        color: var(--color-1st);
        font-size: 2.6rem;
    }
}

.header__page-info {
    h1 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--color-heading-reversed);
    }
}

.header--dashboard {
    height: 7.4rem;
    padding: 1rem 2rem;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2.5fr);
    position: fixed;
    background-color: var(--color-white);
    z-index: 30;
    top: 0;
    left: 21.6rem;
    //margin-left: -3.2rem;

    .header__site {
        max-width: 24rem;

        box-shadow: 0px 12px 20px rgba(69, 77, 104, 0.1);
        border-radius: 4px;
    }

    .header__left {
        align-self: center;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: var(--space-small);
    }

    .header__collapse {
        .v-btn {
            margin: 0 !important;
        }

        @media screen and (max-width: 1179px) {
            display: none;
        }
    }

    .header__right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 1rem;
        grid-gap: 2.4rem;
        gap: 2.4rem;
    }

    @media screen and (max-width: 1440px) {
        margin-left: -2.4rem;
    }
}

.width--normal {
    width: calc(100vw - 21.6rem);
}

.width--collapse {
    width: calc(100% - 9.8rem);
    left: 10rem;
    @media screen and (max-width: 1440px) {
        left: 12.5rem;
    }
}

.drawer {
    display: block;

    @media screen and (min-width: 1024px) {
        display: none;
    }
}

.page-name {
    margin-top: 0;
    font-weight: 600;
    font-size: 2.2rem;
    line-height: 17px;
    margin-bottom: 0.5rem;
}

.breadcrumb {
    margin-bottom: 0;
    padding: 0;
    background-color: transparent;
    color: alpha(var(--color-gray), 0.6);
}

.breadcrumb-item {
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    color: alpha(var(--color-gray), 0.6);
}

@media (max-width: 768px) {
    .page-name {
        font-size: 12px;
        margin-bottom: 0.25rem;
    }

    .breadcrumb-item {
        font-size: 10px;
    }
}
</style>
