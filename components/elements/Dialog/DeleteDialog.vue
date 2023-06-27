<template lang="html">
    <v-dialog v-model="openDialog" width="480" persistent>
        <DialogContentCard @close="onClose()">
            <template slot="icon">
                <StatusIcon type="danger" />
            </template>
            <template slot="content">
                <p>
                    <strong>{{ title }}</strong>
                </p>
            </template>
            <template slot="actions">
                <v-btn class="btn btn--ghost btn--gray" @click="onClose()"> Cancel</v-btn>
                <v-btn class="btn btn--primary btn--red" @click="onSubmit()">Delete</v-btn>
            </template>
        </DialogContentCard>
    </v-dialog>
</template>

<script>
import DialogContentCard from "~/components/elements/Dialog/components/DialogContentCard"
import StatusIcon from "~/components/shared/Icon/StatusIcon"

export default {
    name: "DeleteDialog",
    components: {
        StatusIcon,
        DialogContentCard
    },
    data() {
        return {
            openDialog: false
        }
    },
    props: {
        title: {
            type: String,
            default: "Are you sure to delete this item?"
        },
        open: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClose() {
            this.openDialog = false
            this.$emit("close")
        },
        onSubmit() {
            this.openDialog = false
            this.$emit("onSubmit")
        },
        selectedForm(val) {
            this.activeSelect = val
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
    box-shadow: 0px 34px 100px alpha(var(--color-gray), 0.18);
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

.dropzone--custom {
    display: flex;
    flex-direction: column;

    i {
        font-size: 3rem;
        color: var(--color-primary);
    }

    span {
        color: alpha(var(--color-gray), var(--level-3));
        font-weight: 500;
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

    &__icon {
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
}
</style>
