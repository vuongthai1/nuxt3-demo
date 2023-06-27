<template lang="html">
    <v-dialog v-model="openDialog" width="480" persistent>
        <DialogContentCardCustom @close="onClose()" type="full">
            <template slot="icon">
                <StatusIcon type="danger" />
            </template>
            <template slot="content">
                <slot>
                    <p> Are you sure you want to unpublish this domain? </p>
                </slot>
            </template>
            <template slot="actions">
                <v-btn class="btn btn--ghost btn--gray btn--sm" @click="onClose()">Cancel</v-btn>
                <v-btn class="btn btn--ghost btn--red btn--sm" @click.prevent="onSubmit">
                    <slot name="confirm-text"> Unpublish </slot>
                </v-btn>
            </template>
        </DialogContentCardCustom>
    </v-dialog>
</template>
<script>
import StatusIcon from "~/components/shared/Icon/StatusIcon"
import DialogContentCardCustom from "~/components/elements/Dialog/components/DialogContentCardCustom"
export default {
    name: "UnPublish",
    components: {
        DialogContentCardCustom,
        StatusIcon
    },
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            openDialog: false
        }
    },
    methods: {
        onClose() {
            this.openDialog = false
            this.$emit("close")
        },
        onSubmit() {
            this.$emit("onSubmit")
        }
    },
    watch: {
        open(val) {
            this.openDialog = val
        }
    }
}
</script>
<style lang="scss" scoped></style>
