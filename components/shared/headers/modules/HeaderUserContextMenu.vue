<template lang="html">
    <v-list elevation="0" class="list">
        <v-list-item>
            <v-list-item-title>
                <a class="list-link" href="#" @click.prevent="onLogout">
                    <i class="ri-logout-circle-line" />
                    <span>Sign out</span>
                </a>
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>
<script>
export default {
    name: "HeaderUserContextMenu",
    methods: {
        async onLogout() {
            await this.$auth.logout().then(() => {
                window.location.href = "/auth/signin"
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.list-link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 0.4rem;
    gap: 0.4rem;
    height: 4rem;
    border-radius: 0;

    &:hover,
    &:focus {
        color: var(--color-1st);
    }
}

.v-list-item {
    &:hover {
        background-color: #f6f6f6;
    }
}
</style>
