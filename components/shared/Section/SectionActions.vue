<template>
    <div class="v-data-table__footer">
        <div class="v-data-footer__select">
            <v-select
                v-model="pageSize"
                :items="pageSizes"
                :value="10"
                outlined
                dense
                class="me-2"
                @change="onChangePageSize"
            ></v-select>
            <div>Entries per page</div>
        </div>
        <v-pagination v-model="page" :length="3" @input="onChangePageIndex"></v-pagination>
        <v-pagination
            v-model="pageIndex"
            :length="pageCount"
            @input="onChangePageIndex"
        ></v-pagination>
        
    </div>
</template>

<script>
import { PAGE_SIZE } from "~/ultilities/contants/menu-management"
import { appPagination } from "~/services/https/httpServices"

export default {
    name: "SectionActions",
    components: {},
    props: {
        indicator: {
            type: Object,
            default: () => {}
        }
    },
    created() {
        //  console.log({  indicator: this.indicator })
    },
    computed: {
        onCalculateLengthPagination() {
            let result = this.indicator.total / this.indicator.pageSize
            if (!Number.isInteger(result)) {
                this.length = Math.floor(result) + 1
            }
            // console.log(result)
            return result
        },
    },
    data() {
        return {
            pagesize: PAGE_SIZE,
            page: 1,
            page_number: "10",
            length: 6
        }
    },
    methods: {
        async onChangePageSize() {
            this.$emit("changePageSize", this.pageSize)
        },
        async onChangePageIndex() {
            this.$emit("changePageIndex", this.pageIndex)
        }
    }
}
</script>
<style lang="scss">
.v-data-table__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 3.2rem;

    .v-data-footer__select {
        display: inline-flex;
        align-items: baseline;
        white-space: nowrap;
        justify-content: flex-start;
        flex: 1 0 0%;

        .v-select {
            margin: 0;
        }

        .v-select__selections {
            .v-select__selection--comma {
                font-size: 1.4rem;
            }
        }
    }
}
</style>
