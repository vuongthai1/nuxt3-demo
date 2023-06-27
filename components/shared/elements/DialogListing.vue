<template>
    <div class="list-dialog">
        <h3>Show Dialogs</h3>
        <h4 style="color: red">Default Dialog</h4>
        <div>
            <h4 class="mb-5">Show default dialog full header & footer</h4>
            <v-btn class="btn btn--outline btn--red mr-4" @click="defaultDialogSM = true">
                Dialog small
            </v-btn>
            <v-btn class="btn btn--outline btn--green mr-4" @click="defaultDialogMD = true">
                Dialog medium</v-btn>
            <v-btn class="btn btn--outline btn--yellow mr-4" @click="defaultDialogLG = true">
                Dialog large</v-btn>
            <v-btn class="btn btn--outline btn--yellow mr-4" @click="defaultDialogMedia = true">
                Dialog Media</v-btn>
            <div>
                <Dialog :open="defaultDialogSM" :size="'small'" :title="'Confirm Dialog Small'" :type="'full'"
                    @close="defaultDialogSM = false"></Dialog>
                <Dialog :open="defaultDialogMD" :size="'medium'" :title="'Confirm Dialog Medium'" :type="'full'"
                    @close="defaultDialogMD = false">
                </Dialog>
                <Dialog :open="defaultDialogLG" :size="'large'" :title="'Confirm Dialog Large'" :type="'full'"
                    @close="defaultDialogLG = false"></Dialog>
                <ImportFileDialog :open="defaultDialogMedia" :size="'large'" :title="'Dialog Media'" :type="'full'"
                    @close="defaultDialogMedia = false"></ImportFileDialog>
            </div>
        </div>

        <!--        <div class="mt-8">
            <h4 class="mb-5">Show default dialog only header</h4>
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;red btn&#45;&#45;md mr-4" @click="defaultDialogSM = true"
                >Dialog small</v-btn
            >
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;green btn&#45;&#45;md mr-4" @click="defaultDialogMD = true"
                >Dialog medium</v-btn
            >
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;yellow btn&#45;&#45;md mr-4" @click="defaultDialogLG = true"
                >Dialog large</v-btn
            >
            <div>
                <Dialog
                    :open="defaultDialogSM"
                    :size="'small'"
                    :title="'Confirm Dialog Small'"
                    :type="'header'"
                    @close="defaultDialogSM = false"
                >
                </Dialog>
                <Dialog
                    :open="defaultDialogMD"
                    :size="'medium'"
                    @close="defaultDialogMD = false"
                    :type="'header'"
                >
                </Dialog>
                <Dialog
                    :open="defaultDialogLG"
                    :size="'large'"
                    :type="'header'"
                    @close="defaultDialogLG = false"
                ></Dialog>
            </div>
        </div>

        <div class="mt-8">
            <h4 class="mb-5">Show default dialog only footer</h4>
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;red btn&#45;&#45;md mr-4" @click="defaultDialogSM = true"
                >Dialog small</v-btn
            >
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;green btn&#45;&#45;md mr-4" @click="defaultDialogMD = true"
                >Dialog medium</v-btn
            >
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;yellow btn&#45;&#45;md mr-4" @click="defaultDialogLG = true"
                >Dialog large</v-btn
            >
            <div>
                <Dialog
                    :open="defaultDialogSM"
                    :size="'small'"
                    :title="'Confirm Dialog Small'"
                    :type="'footer'"
                    @close="defaultDialogSM = false"
                >
                </Dialog>
                <Dialog
                    :open="defaultDialogMD"
                    :size="'medium'"
                    @close="defaultDialogMD = false"
                    :type="'footer'"
                >
                </Dialog>
                <Dialog
                    :open="defaultDialogLG"
                    :size="'large'"
                    :type="'footer'"
                    @close="defaultDialogLG = false"
                ></Dialog>
            </div>
        </div>

        <div class="mt-8">
            <h4 class="mb-5">Show default dialog with none header & footer</h4>
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;red btn&#45;&#45;md mr-4" @click="defaultDialogSM = true"
                >Dialog small</v-btn
            >
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;green btn&#45;&#45;md mr-4" @click="defaultDialogMD = true"
                >Dialog medium</v-btn
            >
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;yellow btn&#45;&#45;md mr-4" @click="defaultDialogLG = true"
                >Dialog large</v-btn
            >
            <div>
                <Dialog
                    :open="defaultDialogSM"
                    :size="'small'"
                    :title="'Confirm Dialog Small'"
                    :type="'none'"
                    @close="defaultDialogSM = false"
                >
                </Dialog>
                <Dialog
                    :open="defaultDialogMD"
                    :size="'medium'"
                    @close="defaultDialogMD = false"
                    :type="'none'"
                >
                </Dialog>
                <Dialog
                    :open="defaultDialogLG"
                    :size="'large'"
                    :type="'none'"
                    @close="defaultDialogLG = false"
                ></Dialog>
            </div>
        </div>

        <h4 style="color: red" class="mt-8">Error Dialog</h4>
        <div class="mt-8">
            <h4 class="mb-5">Show error dialog</h4>
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;red btn&#45;&#45;md mr-4" @click="errorDialogSM = true"
                >Dialog small</v-btn
            >
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;green btn&#45;&#45;md mr-4" @click="errorDialogMD = true"
                >Dialog medium</v-btn
            >
            <v-btn class="btn btn&#45;&#45;outline btn&#45;&#45;yellow btn&#45;&#45;md mr-4" @click="errorDialogLG = true"
                >Dialog large</v-btn
            >
            <div>
                <ErrorDialog
                    :open="errorDialogSM"
                    :title="'Are you sure delete this record ?'"
                    :size="'small'"
                    :type="'footer'"
                    @close="errorDialogSM = false"
                ></ErrorDialog>

                <ErrorDialog
                    :open="errorDialogMD"
                    :title="'Are you sure delete this record ?'"
                    :size="'medium'"
                    :type="'footer'"
                    @close="errorDialogMD = false"
                ></ErrorDialog>

                <ErrorDialog
                    :open="errorDialogLG"
                    :title="'Are you sure delete this record ?'"
                    :size="'large'"
                    :type="'footer'"
                    @close="errorDialogLG = false"
                ></ErrorDialog>
            </div>
        </div>-->
    </div>
</template>

<script>
import Dialog from "~/components/elements/Dialog/Dialog"
import ImportFileDialog from "~/components/shared/Dialog/ImportFileDialog"
import ErrorDialog from "~/components/elements/Dialog/ErrorDialog"

export default {
    name: "DialogListing",
    components: {
        Dialog,
        ErrorDialog,
        ImportFileDialog
    },
    data() {
        return {
            defaultDialogSM: false,
            defaultDialogMD: false,
            defaultDialogLG: false,
            defaultDialogMedia: false,
            errorDialogSM: false,
            errorDialogMD: false,
            errorDialogLG: false
        }
    },

    mounted() { },

    methods: {}
}
</script>

<style lang="scss" scoped>

</style>
