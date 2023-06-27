<template lang="html">
    <div>
        <v-menu offset-y min-width="180">
            <template v-slot:activator="{ on, attrs }">
                <button class="btn--notification" v-bind="attrs" v-on="on">
                    <span class="btn__number" v-if="notificationNumber > 0">
                        {{ notificationNumber }}
                    </span>
                    <span
                        :class="`${
                            notificationNumber > 0 ? 'btn__bell' : ''
                        } ri-notification-2-line`"
                    />
                </button>
            </template>
            <div class="notification">
                <v-list elevation="0" class="list">
                    <div class="notification__header">
                        <span>Notification</span>
                        <a href>View all</a>
                    </div>
                    <div class="notification__info">
                        <SimpleNotification
                            :notify="item"
                            v-for="(item, index) in notification"
                            :key="index"
                        />
                    </div>
                    <a href class="notification__footer">
                        <span>View more</span>
                        <i class="ri-arrow-right-line" />
                    </a>
                </v-list>
            </div>
        </v-menu>
    </div>
</template>

<script>
import SimpleNotification from "~/components/elements/Notication/SimpleNotification"

export default {
    name: "HeaderNotifications",
    components: { SimpleNotification },
    data() {
        return {
            notificationNumber: 3,
            notification: [
                {
                    subject: "Lorem ipsum dolor sit amet",
                    content: "Cum sociis natoque penatibus et magnis dis parturient montes",
                    time: "15 mins ago"
                },
                {
                    subject: "Lorem ipsum dolor sit amet",
                    content: "Cum sociis natoque penatibus et magnis dis parturient montes",
                    time: "15 mins ago"
                },
                {
                    subject: "Lorem ipsum dolor sit amet",
                    content: "Cum sociis natoque penatibus et magnis dis parturient montes",
                    time: "15 mins ago"
                },
                {
                    subject: "Lorem ipsum dolor sit amet",
                    content: "Cum sociis natoque penatibus et magnis dis parturient montes",
                    time: "15 mins ago"
                },
                {
                    subject: "Lorem ipsum dolor sit amet",
                    content: "Cum sociis natoque penatibus et magnis dis parturient montes",
                    time: "15 mins ago"
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.notification {
    border-radius: 0.8rem;
    min-width: 34rem;
    max-width: 50rem;

    &__header {
        display: flex;
        justify-content: space-between;
        padding: 1rem 1.4rem;
        font-size: 1.4rem;
        border-bottom: 1px solid #e9e9e9;

        > span {
            color: #333;
            font-weight: 600;
        }

        > a {
            color: #00634f;
        }
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.6rem 1.4rem;
        color: #2958c6;
        border-top: 1px solid #e9e9e9;

        > span {
            font-weight: 600;
        }

        > i {
            padding-left: 0.5rem;
            font-size: 2rem;
        }
    }
}

.notification__info {
    max-height: 30rem;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
        background: #e6e6e6;
        border-left: 1px solid #dadada;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--color-primary);
        border: solid 1px #e6e6e6;
        border-radius: 1rem;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: black;
    }
}

.btn--notification {
    width: 4rem;
    height: 4rem;
    margin-right: 2rem;

    span {
        font-size: 2rem;
    }

    .btn__bell {
        font-size: 2rem;
        display: block;
        -webkit-animation: ring 4s 0.7s ease-in-out;
        -webkit-transform-origin: 50%;
        -moz-animation: ring 4s 0.7s ease-in-out;
        -moz-transform-origin: 50%;
        animation: ring 4s 0.7s ease-in-out;
        transform-origin: 50%;
    }

    .btn__number {
        z-index: 1;
        background: #fb5458;
        border-radius: 100%;
        width: 1.6rem;
        height: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        margin-left: 2rem;
        color: #fff;
        font-size: 1.2rem;
    }
}

.v-list-item {
    &:hover {
        background-color: #f6f6f6;
    }
}
</style>
