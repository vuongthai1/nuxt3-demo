<template>
    <div class="app-link">
        <ul class="link__list">
            <li class="link__list__item" v-for="(item, index) in linkList" :key="index">
                <nuxt-link :to="item.link" :class="{ active: item.active }">
                    {{ item.label }}
                    <i class="ri-arrow-right-s-line" />
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "AppLinks",

    props: {
        linkList: {
            type: Array,
            default: () => [
                {
                    label: "General",
                    link: "/pages"
                },
                {
                    label: "Sections",
                    link: "/pages/sections"
                },
                {
                    label: "Settings",
                    link: "/pages/settings"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.link__list {
    list-style-type: none;
    border-radius: 6px;
    padding-left: 0;

    &__item {
        width: 36.3rem;
        margin-bottom: 0.4rem;
        background-color: var(--color-white);
        border-radius: 6px;

        a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0;
            color: var(--color-text);
            font-weight: 600;
            font-size: 1.6rem;
            line-height: 2.24rem;
            padding: 1.8rem 2.4rem;
            i {
                font-size: 2.4rem;
                color: var(--color-text);
            }

            &.active {
                color: var(--color-blue);
                background: alpha(var(--color-blue), 0.06);
                i {
                    color: var(--color-blue);
                }
            }
        }

        &:hover {
            background-color: alpha(var(--color-blue), var(--level-1));

            a {
                color: var(--color-blue);
            }

            i {
                color: var(--color-blue);
            }
        }
    }
}
</style>
