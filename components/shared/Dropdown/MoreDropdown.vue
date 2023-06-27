<template lang="html">
    <v-menu offset-y left class="dropdown--more">
        <template v-slot:activator="{ on, attrs }">
            <v-btn x-small fab v-bind="attrs" icon v-on="on">
                <i class="ri-more-2-fill" />
            </v-btn>
        </template>
        <v-list flat class="dropdown__list">
            <v-list-item-group>
                <v-list-item
                    v-for="(menu, index) in menus"
                    :key="index"
                    class="dropdown__item"
                    @click="$emit('click', menu)"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            <span :class="menu.color === 'red' ? 'text-red' : 'text-black'">
                                {{ menu.name }}</span
                            >
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: "MoreDropdown",
    props: {
        menus: {
            type: Array,
            default: []
        }
    }
}
</script>

<style lang="scss">
.v-menu__content {
    box-shadow: none;
    border: 1px solid alpha(var(--color-secondary), var(--level-2));
    border-radius: 6px;
}
</style>
<style lang="scss" scoped>
.dropdown {
    &__item {
        min-height: 1px;

        :deep(.v-list-item__content) {
            padding: 0.8rem 0;

            .v-list-item__title {
                font-size: 1.3rem !important;
                color: var(--color-black) !important;
            }
        }
    }
}
</style>
