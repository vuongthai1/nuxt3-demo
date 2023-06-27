<template lang="html">
    <form class="form--section-search" @submit.prevent>
        <v-text-field
            outlined
            dense
            :placeholder="placeholder"
            prepend-inner-icon="ri-search-line"
            v-model="keyword"
            @input="onSearch"
            hide-details
        />
    </form>
</template>

<script>
export default {
    name: "SectionSearchForm",
    data() {
        return {
            keyword: ""
        }
    },
    props: {
        placeholder: {
            type: String,
            default: () => "Search..."
        },
    },
    methods: {
        onSearch() {
            this.$emit("onSearch", this.keyword)
        }
    }
}
</script>
<style lang="scss" scoped>
.form--section-search {
    max-width: 50rem;
    background-color: white;
}
</style>
