<template>
    <div class="header-menu">
        <ul class="menu__list">
            <template v-for="(item, index) in itemList">
                <li v-if="!item.subMenu" class="menu__list__item" :key="index">
                    <nuxt-link :to="item.route">
                        <i :class="item.icon" />
                        {{ item.title }}
                    </nuxt-link>
                </li>
                <v-menu open-on-hover bottom left offset-y v-else>
                    <template v-slot:activator="{ on, attrs }">
                        <li v-bind="attrs" v-on="on" class="menu__list__item" :key="index">
                            <nuxt-link :to="item.route" :class="{ active: item.route === $route.path }">
                                <i :class="item.icon" />
                                {{ item.title }}
                            </nuxt-link>
                        </li>
                    </template>

                    <v-list>
                        <v-list-item v-for="(subMenu, index) in item.subMenu" :key="index">
                            <nuxt-link :to="subMenu.route" style="width: 100%">
                                <v-list-item-title>
                                    {{ subMenu.title }}
                                </v-list-item-title>
                            </nuxt-link>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    name: "HeaderMenu",

    data() {
        return {
            itemList: [
                {
                    title: "Menu",
                    icon: "ri-file-list-line",
                    route: "/menus"
                    /* subMenu: [
                        {
                            title: "All menus",
                            route: "/menus"
                        },
                        {
                            title: "Create new menu",
                            route: "/menus/create"
                        }
                    ]*/
                },
                {
                    title: "Blog",
                    icon: "ri-newspaper-line",
                    route: "/blog",
                    subMenu: [
                        {
                            title: "All blog posts",
                            route: "/blog"
                        },
                        {
                            title: "New post",
                            route: "/blog/create"
                        },
                        {
                            title: "Categories",
                            route: "/blog/categories"
                        }
                    ]
                },
                {
                    title: "Media Library",
                    icon: "ri-image-2-line",
                    route: "/media-library",
                    // subMenu: [
                    //     {
                    //         title: "Images",
                    //         route: "/media-library"
                    //     },
                    //     {
                    //         title: "Videos",
                    //         route: "/media-library/videos"
                    //     },
                    //     {
                    //         title: "Documents",
                    //         route: "/media-library/documents"
                    //     }
                    // ]
                },
                {
                    title: "Settings",
                    icon: "ri-settings-3-line",
                    route: "/settings"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.menu__list {
    margin-bottom: 0;
    &__item {
        list-style-type: none;
        display: inline-block;
        margin-right: 2.6rem;

        i {
            width: 1.5rem;
            margin-right: 0.8rem;
        }

        a {
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            font-weight: 500;
            line-height: 2.24rem;
            color: var(--color-menu-black);

            &:hover {
                color: var(--color-menu);
            }

            &.active {
                color: var(--color-blue);
            }
        }
    }
}
:deep(.v-list) {
    min-width: 16rem;
    padding: 0.2rem 0;
    .v-list-item {
        min-height: unset;
        padding: 0 0.4rem;
    }
    .v-list-item__title {
        cursor: pointer;
        margin: 0.2rem 0;
        display: flex;
        align-items: center;
        border-radius: 0.4rem;
        min-height: 3.2rem;
        background-color: var(--color-bg-gray);
        padding: 1.2rem 0.6rem;
        a:hover {
            color: var(--color-blue);
        }
        &:hover {
            background-color: var(--color-light-blue);
            color: var(--color-blue);
        }

        // &.active {
        //     color: var(--color-blue);
        // }
    }
}
</style>
