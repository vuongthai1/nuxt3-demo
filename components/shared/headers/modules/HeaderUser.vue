<template lang="html">
    <div class="header__user ps-dropdown" style="display: flex">
        <!--        <HeaderNotifications />-->
        <v-menu offset-y min-width="180">
            <template v-slot:activator="{ on, attrs }">
                <button class="btn--user" v-bind="attrs" v-on="on">
                    <span class="btn__info">
                        <span>{{
                            authenInfo && authenInfo.displayName ? authenInfo.displayName : "System Developer"
                        }} </span>
                    </span>
                    <i class="ri-arrow-down-s-line" />
                </button>
            </template>
            <div class="ps-dropdown__content">
                <HeaderUserContextMenu />
            </div>
        </v-menu>
    </div>
</template>

<script>
import HeaderUserContextMenu from "~/components/shared/headers/modules/HeaderUserContextMenu"
import HeaderNotifications from "~/components/shared/headers/modules/HeaderNotifications"
import { mapState } from "vuex"
export default {
    name: "HeaderUser",
    components: { HeaderNotifications, HeaderUserContextMenu },
    props: {
        source: {
            type: Object,
            default: () => null
        }
    },
    computed: {
        ...mapState({
            authenInfo: (state) => state.user.authenInfo
        })
    },
    methods: {
        handleLogout() {
            this.$auth.logout()
        }
    }
}
</script>

<style lang="scss" scoped>
.btn--user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.4rem;
    grid-gap: 0.4rem;

    img {
        max-height: 4rem;
        border-radius: 50%;
    }

    >i {
        color: var(--color-heading-reversed);
    }

    .btn__info {
        img {
            margin-left: 0.4rem;
        }

        span {
            font-weight: 600;
            color: var(--color-heading-reversed);
        }
    }

    @media screen and (max-width: 1023px) {
        .btn__info {
            span {
                display: none;
            }
        }
    }
}
</style>
