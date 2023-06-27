<template>
    <div class="indicator" v-if="appLoading">
        <div class="indicator__content">
            <p>{{ appLoadingMessage }}</p>
            <v-progress-linear indeterminate color="var(--color-primary)" height="6" rounded />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: "ProcessingIndicator",
    computed: {
        ...mapState({
            appLoading: (state) => state.app.appLoading,
            appLoadingMessage: (state) => state.app.appLoadingMessage
        })
    },

    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: alpha(var(--color-white), 0.4);
        z-index: -1;
    }

    .indicator__content {
        position: relative;
        border-radius: 0.4rem;
        top: 0;
        left: 0;
        width: 100%;
        max-width: 32rem;
        z-index: 999;

        p {
            margin-bottom: 0.4rem;
            color: var(--color-heading);
        }
    }
}
</style>
