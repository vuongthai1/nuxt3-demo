<template>
    <div class="v-section__filter">
        <v-row class="justify-space-between">
            <v-col cols="3">
                <v-text-field
                    outlined
                    dense
                    :placeholder="placeholder"
                    prepend-inner-icon="ri-search-line"
                    v-model="keyword"
                    @change="onSearch"
                ></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: "SectionFilter",
    props: {
        placeholder: {
            type: String,
            default: "Search something..."
        }
    },
    data() {
        return {
            keyword: ""
        }
    },

    methods: {
        onSearch() {
            this.$emit("onSearch", this.keyword)
        }
    }
}
</script>
<style lang="scss" scoped>
.v-section__filter {
    :deep(.v-text-field) {
        font-size: 1.4rem;

        input {
            font-size: 1.4rem;
        }
        .v-input__slot {
            background-color: var(--color-white);
            // border: 1px solid rgba(93, 101, 115, 0.4);
            border-radius: 8px;
        }

        ::placeholder {
            font-size: 1.4rem;
        }
    }
}
</style>
