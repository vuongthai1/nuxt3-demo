<template lang="html">
    <div class="section--title">
        <div class="section--title__back">
            <v-btn icon class="btn-custom" @click.prevent="onCancel">
                <i class="ri-arrow-left-s-line" />
            </v-btn>
            <h3>{{ title }}</h3>
        </div>
        <div class="status-label">
            <StatusLabel :text="textStatus" :type="typeStatus" v-if="isDetail" />
        </div>
    </div>
</template>
<script>
import StatusLabel from "~/components/shared/Label/StatusLabel.vue"
export default {
    name: "SectionTitle",
    components: { StatusLabel },
    props: {
        title: {
            type: String,
            default: ""
        },
        isDetail: {
            type: Object,
            default: null
        }
    },
    data() {
        return {}
    },
    computed: {
        textStatus() {
            return this.isDetail?.active ? "Publish" : "Draft"
        },
        typeStatus() {
            return this.isDetail?.active ? "active" : "deactivate"
        }
    },
    methods: {
        onCancel() {
            this.$emit("onCancel")
        }
    }
}
</script>
<style lang="scss" scoped>
.section--title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 4.4rem;

    &__back {
        display: flex;
        flex-direction: row;
        align-items: center;

        h3 {
            margin-bottom: 0;
            font-weight: 600;
        }
    }

    &__status {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.6rem;
        min-width: 7.4rem;
        height: 2.4rem;
        font-weight: 600;
        font-size: 1.2rem;

        span {
            padding: 0 1.6rem;
        }
    }
}

.btn-custom {
    i {
        font-size: 2.8rem;
        color: var(--color-black);
    }
}
</style>
