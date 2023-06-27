<template>
    <AuthContainer>
        <SignInForm/>
    </AuthContainer>
</template>

<script>
import SignInForm from "~/components/components/Auth/components/SignInForm.vue"
import AuthContainer from "~/components/components/Auth/AuthContainer"
import {appSettings} from "~/app-settings"

export default {
    head() {
        return {
            title: `Sign In | ${appSettings.siteName}`
        }
    },
    components: {
        AuthContainer,
        SignInForm
    },
    created() {
        // const loggedIn = this.$auth.loggedIn
        // if (loggedIn) {
        //     this.$auth.logout().then(() => {
        //         window.location.href = "/auth/signin"
        //     })
        // }
    },
}
</script>
