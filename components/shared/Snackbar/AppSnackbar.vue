<template>
    <v-snackbar v-model="snackBar.show" top text color="green darken-4">
        <span class="message--snackBar">
            <i class="ri-information-line" />
            {{ snackBar.message }}
        </span>
    </v-snackbar>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: "AppSnackBar",
    props: {
        // open: {
        //     type: Boolean,
        //     default: false
        // },
        // message: {
        //     type: String,
        //     default: "Successfully!"
        // }
    },
    computed: {
        ...mapState({
            snackBar: (state) => state.app.snackBar
        }),
    },

}
</script>