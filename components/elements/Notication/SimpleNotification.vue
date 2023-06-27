<template lang="html">
    <v-list-item>
        <v-list-item-title>
            <nuxt-link to="/">
                <span class="list-link-notify">
                    <p class="list-link-notify__icon">
                        <i class="ri-chat-poll-line" />
                    </p>
                    <span class="list-link-notify__content">
                        <p
                            ><strong>{{ notify.subject }}</strong></p
                        >
                        <p class="text-wrap"> {{ notify.content }} </p>
                        <p>
                            <i class="ri-time-line" />
                            <span>{{ notify.time }}</span>
                        </p>
                    </span>
                </span>
            </nuxt-link>
        </v-list-item-title>
    </v-list-item>
</template>

<script>
export default {
    name: "SimpleNotification",
    computed: {},
    props: {
        notify: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {}
    },
    methods: {}
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

.list-link-notify {
    display: flex;
    flex-direction: row;

    &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
        margin-right: 1rem;
        width: 2.4rem;
        height: 2.4rem;
        background: #ffffff;
        box-shadow: 0px 4px 4px rgba(93, 101, 115, 0.2);
        border-radius: 10rem;

        > i {
            color: rgba(93, 101, 115, 0.6);
        }
    }

    &__content {
        margin-top: 1rem;
        max-width: 40rem;
    }

    p strong {
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
    }

    p {
        word-break: break-word;
        font-weight: 500;
        color: rgba(93, 101, 115, 0.6);
        margin-bottom: 0.7rem;
        display: flex;
        color: rgba(93, 101, 115, 0.6);

        span {
            margin-left: 0.5rem;
        }
    }
}
</style>
