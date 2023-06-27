<template lang="html">
    <v-dialog v-model="openDialog" width="480" persistent>
        <DialogContentCard @close="onClose()" :type="type">
            <template slot="icon">
                <StatusIcon type="warning" />
            </template>
            <template slot="content">
                <p>
                    Unpublish this content will automatically change it to a draft.
                    <strong> Are you sure you want to unpublish it? </strong>
                </p>
            </template>
            <template slot="actions">
                <v-btn class="btn btn--ghost btn--red" @click="onClose()">Cancel</v-btn>
                <v-btn class="btn btn--primary btn--green" @click.prevent="onSubmit">Yes</v-btn>
            </template>
        </DialogContentCard>
    </v-dialog>
</template>

<script>
import StatusIcon from "~/components/shared/Icon/StatusIcon"
import DialogContentCard from "~/components/elements/Dialog/components/DialogContentCard"

export default {
    name: "ConfirmDialog",
    components: {
        DialogContentCard,
        StatusIcon
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
        type: {
            type: String,
            default: "full"
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

<style lang="scss" scoped>
.btn--icon-warning {
    position: relative;
    top: 0;
    background-color: alpha(var(--color-blue), 0.06) !important;

    i {
        color: var(--color-blue) !important;
    }
}

.dialog__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 1.2rem;
    gap: 1.2rem;

    > * {
        min-width: 12rem;
    }
}

.v-dialog {
    box-shadow: 0 34px 100px alpha(var(--color-gray), 0.18);
    border-radius: 1.6rem;
    background-color: #fff;
}

.section__Upload {
    padding: 6.5rem 13rem;
}

.btn-group {
    flex-flow: row nowrap;
    display: flex;
    justify-content: center !important;
    align-items: center;
    grid-gap: 1.2rem;
    gap: 1.2rem;

    .btn {
        max-width: 12rem;
        border-radius: 0.8rem !important;
    }

    .btn__upload-file {
        min-width: min-content !important;
    }
}

.dropzone {
    min-height: 24rem;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        margin: 2.4rem 0;
        color: var(--color-black);
        font-weight: 600;
        font-size: 16px;
        line-height: 160%;
    }

    .content-icon {
        width: 7.2rem;
        height: 7.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: alpha(var(--color-red), var(--level-1));
        border-radius: 5rem;

        i {
            font-size: 2.4rem;
            color: alpha(var(--color-red), var(--level-3));
        }
    }

    .content__text {
        padding-top: 2.4rem;

        p {
            margin-bottom: 0;
            font-weight: 500;
            line-height: 1.4em;

            strong {
                font-weight: 600;
                color: var(--color-heading);
            }
        }
    }
}
</style>
