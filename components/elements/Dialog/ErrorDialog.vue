<template>
    <v-dialog v-model="openDialog" persistent :width="sizeDialog">
        <DialogCard @close="onClose()" :type="typeDialog">
            <template slot="content">
                <div class="align-elements--center flex-column">
                    <div class="bg-icon align-elements--center">
                        <i class="ri-delete-bin-6-line" />
                    </div>
                    <div class="notification-text mt-6">
                        <p>{{ title }}</p>
                    </div>
                </div>
            </template>

            <template slot="actions">
                <v-btn class="btn btn--ghost btn--gray" @click="onClose()">Cancel</v-btn>
                <v-btn class="btn btn--ghost btn--red" @click="onClose()">Delete</v-btn>
            </template>
        </DialogCard>
    </v-dialog>
</template>

<script>
// ===== Import Components ===== //
import DialogCard from "./components/DialogCard"
export default {
    name: "ErrorDialog",
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
            default: "Error Dialog"
        },
        typeDialog: {
            type: String,
            default: "full"
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

<style lang="scss" scoped>
.v-dialog {
    box-shadow: 0px 34px 100px rgba(69, 77, 104, 0.18);
    border-radius: 1.6rem;
    background-color: var(--color-white);
}
</style>
