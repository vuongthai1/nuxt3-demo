<template>
    <div class="block--color-picker">
        <label>{{ title }}</label>
        <div class="color-picker" :style="{ backgroundColor: color }">
            <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn :depressed="true" v-bind="attrs" v-on="on"> Select color </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>
                            <v-color-picker v-model="color" @update:color="handleColorChange" class="ma-2"
                                canvas-height="300"></v-color-picker>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
export default {
    name: "ToggleColorPicker",
    data() {
        return {
            color: "#D9D9D9"
        }
    },
    props: {
        title: {
            type: String,
            default: "Select color"
        },
        colorPicker: {
            type: String,
            default: () => ""
        },
    },
    created() {
        if (this.colorPicker) {
            this.color = this.colorPicker
        } else {
            this.color = "#D9D9D9"
        }
    },
    methods: {
        handleColorChange(val) {
            this.color = val.hex
            this.$emit("toggleColor", this.color)
        }
    }
}
</script>

<style lang="scss" scoped>
label {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: var(--color-menu-black);
}

.color-picker {
    width: 15rem;
    border: 1px solid #5d6573;
    border-radius: 4px;
    text-align: right;

    button.v-btn {
        width: 11rem;
        padding: 1.2rem 0;
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 1.9rem;
        letter-spacing: 0 !important;
        background: #fff;
        color: #5d6573;
        text-transform: capitalize;
    }
}
</style>
