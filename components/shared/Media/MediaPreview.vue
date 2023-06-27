<template lang="html">
    <div class="box--image">
        <div class="box__image">
            <img :src="url" alt="" />
        </div>
        <div class="box__actions">
            <v-tooltip top color="blue">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="btn btn--ghost btn--blue btn--sm btn--icon"
                        v-bind="attrs"
                        v-on="on"
                        @click="onChange"
                    >
                        <i class="ri-refresh-line" />
                    </v-btn>
                </template>
                <span>Replace</span>
            </v-tooltip>
            <v-tooltip top color="red">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="btn btn--ghost btn--red btn--sm btn--icon"
                        v-bind="attrs"
                        v-on="on"
                        @click="onRemove"
                    >
                        <i class="ri-delete-bin-6-line" />
                    </v-btn>
                </template>
                <span>Remove</span>
            </v-tooltip>
        </div>
    </div>
</template>

<script>
export default {
    name: "MediaPreview",
    props: {
        url: {
            type: String,
            default: () => {}
        }
    },

    methods: {
        onRemove() {
            this.$emit("onRemove")
        },
        onChange() {
            this.$emit("onChange")
        }
    }
}
</script>
<style lang="scss" scoped>
.box--image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.8rem;
    overflow: hidden;
    background-color: alpha(var(--color-gray), 0.06);
    padding: 0.8rem 1.2rem;

    .box__image {
        position: relative;
        min-width: 24rem;
        max-width: 24rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.4rem;
        overflow: hidden;

        img {
            max-height: 16rem;
        }
    }

    .box__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding: 0.4rem 1.2rem;
        //background-color: rgba(#fff, 0.75);
    }
}
</style>
