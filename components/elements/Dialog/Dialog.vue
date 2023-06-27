<template>
    <v-dialog v-model="openDialog" :width="sizeDialog" persistent>
        <DialogCard :title="title" @close="onClose()" :type="type" :actions="actions">
            <template slot="content">
                <slot name="content" />
            </template>
            <template slot="actions">
                <slot name="actions"></slot>
            </template>
        </DialogCard>
    </v-dialog>
</template>

<script>
import DialogCard from "./components/DialogCard"

export default {
    name: "Dialog",
    components: {
        DialogCard
    },
    data() {
        return {
            openDialog: false
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "medium"
        },
        title: {
            type: String,
            default: "Default Dialog"
        },
        type: {
            type: String,
            default: "full"
        },
        actions: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        sizeDialog() {
            if (this.size === "small") return 480
            if (this.size === "medium") return 640
            if (this.size === "large") return 830
        }
    },
    methods: {
        onClose() {
            this.openDialog = false
            this.$emit("close")
        }
    },
    watch: {
        open(val) {
            this.openDialog = val
        }
    }
}
</script>

<style lang="scss">
.v-dialog {
    box-shadow: 0px 34px 100px rgba(69, 77, 104, 0.18);
    border-radius: 1.6rem;
    background-color: var(--color-white);
}

.btn-group {
    flex-flow: row nowrap;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    grid-gap: 1.2rem;
    gap: 1.2rem;

    .btn {
        max-width: 12rem;
    }
}

.v-text-field {
    .v-text-field--enclosed {
        .v-text-field__details {
            display: none !important;
        }
    }
}
</style>
