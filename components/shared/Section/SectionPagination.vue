<template>
    <div class="v-data-table__footer">
        <div class="v-data-footer__select">
            <v-select
                v-model="currentPageSize"
                :value="pageSize ? pageSize : 10"
                :items="sizes"
                outlined
                dense
                class="me-2"
                @change="onChangePageSize"
            />
            <span>Entries per page</span>
        </div>
        <!-- <p>
            <strong>pageSize: {{ currentPageSize }}</strong> -
            <strong>pageIndex:{{ currentPageIndex }}</strong> -
            <strong>Total:{{ total }}</strong>
        </p> -->
        <v-pagination
            v-model="currentPageIndex"
            :length="paginationLength"
            @input="onChangePageIndex"
            :total-visible="7"
        />
    </div>
</template>

<script>
import { appPagination } from "~/services/https/httpServices"
import { mapState } from "vuex"

export default {
    name: "SectionPagination",
    components: {},
    props: {
        pageSize: {
            type: Number,
            default: appPagination.defaultPageSize
        },
        pageIndex: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: appPagination.defaultPageSize
        }
    },

    computed: {
        ...mapState({
            activeSite: (state) => state.site.activeSite
        }),
        paginationLength() {
            if (this.total === this.currentPageSize || this.total < this.currentPageSize) return 1
            return this.total % this.currentPageSize === 0
                ? Math.floor(this.total / this.currentPageSize)
                : Math.floor(this.total / this.currentPageSize) + 1
        }
    },
    created(){
        // console.log("SectionPagination ",this.pageSize,this.pageIndex,this.total)
    },
    data() {
        return {
            sizes: appPagination.pageSizes,
            currentPageIndex: this.pageIndex,
            currentPageSize: this.pageSize,
            length: 6
        }
    },
    methods: {
        onChangePageSize() {
            this.currentPageIndex = 1
            this.$emit("changePageSize", this.currentPageSize)
            console.log("onChangePageSize: ",this.currentPageSize);

        },
        onChangePageIndex() {
            this.$emit("changePageIndex", this.currentPageIndex)
            console.log("onChangePageIndex: ",this.currentPageIndex);
        }
    },
    watch: {
        pageIndex(e) {
            this.currentPageIndex = e
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
            max-width: 8rem;
        }

        .v-select__selections {
            .v-select__selection--comma {
                font-size: 1.4rem;
            }
        }
    }
}
</style>
