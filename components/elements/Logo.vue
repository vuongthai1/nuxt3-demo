<template lang="html">
    <nuxt-link v-if="dark" to="/" class="logo">
        <img src="~/static/img/logo-dark.svg" alt="" />
    </nuxt-link>
    <nuxt-link v-else to="/" class="logo">
        <img src="~/static/img/logo-dark.svg" alt="" />
    </nuxt-link>
</template>

<script>
export default {
    name: "Logo",
    props: {
        dark: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.logo {
    max-height: 10rem;
}
</style>
