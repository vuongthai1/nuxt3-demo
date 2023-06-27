<template>
    <div class="v-data-table">
        <table :class="`${striped === true ? 'v-table table--striped' : 'v-table'}`">
            <thead>
                <slot name="table-header"></slot>
            </thead>
            <tbody>
                <slot name="table-body"></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "RecordTables",
    props: {
        striped: {
            type: Boolean,
            default: false
        }
    },
    components: {},
    data() {
        return {}
    },
    methods: {},
    mounted() {}
}
</script>
<style lang="scss" scoped></style>
