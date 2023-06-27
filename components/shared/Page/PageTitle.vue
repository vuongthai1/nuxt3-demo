<template lang="html">
    <div v-if="!create" class="box--title">
        <div class="box__left">
            <v-btn class="btn--back" @click="onBack" icon>
                <i class="ri-arrow-left-s-line" />
            </v-btn>
        </div>
        <div class="box__container">
            <h4 :class="postTitle ? 'post-title' : ''">{{ text }}</h4>
            <NumberLabel v-if="number" :value="number" />
            <StatusLabel v-if="status" :text="statusText" :type="statusType" />
            <slot name="extra" />
        </div>
    </div>
    <div v-else class="box--title box--create">
        <h4>{{ text }}</h4>
    </div>
</template>

<script>
import NumberLabel from "~/components/components/Dashboard/components/Label/NumberLabel.vue"
import StatusLabel from "~/components/components/Dashboard/components/Label/StatusLabel.vue"
import { mapState } from "vuex"

export default {
    name: "PageTitle",
    components: { StatusLabel, NumberLabel },
    props: {
        text: {
            type: String,
            default: "Untitled"
        },
        create: {
            type: Boolean,
            default: false
        },
        number: {
            type: Number,
            default: 0
        },
        status: {
            type: Boolean,
            default: false
        },
        statusType: {
            type: String,
            default: "Active" // active | deactive
        },
        statusText: {
            type: String,
            default: "Published"
        },
        postTitle: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            pageDetails: (state) => state.page.pageDetails
        })
    },
    methods: {
        onBack() {
            this.$emit("onBack")
        }
    }
}
</script>
<style lang="scss" scoped>
.btn--back {
    ::v-deep(.v-btn__content) {
        i {
            font-size: 3.2rem;
        }
    }
}

.box--title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 0.4rem;
    gap: 0.4rem;

    .box__container {
        display: flex;
        flex-flow: row nowrap;
        // align-items: center;
        grid-gap: 0.6rem;
        gap: 0.6rem;

        h4 {
            margin-bottom: 0;
            font-size: 3.2rem;
            font-weight: 600;
            max-width: 87.4rem;
        }
        .post-title {
            font-size: 2.4rem;
        }
    }
}
</style>
