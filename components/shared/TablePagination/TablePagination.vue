<template lang="html">
    <div class="section__footer">
        <div class="col-6 section__footer-page-size">
            <v-select :items="meta.perPages" :value="meta.pageSize ? meta.pageSize : 10" outlined dense hide-details
                style="width: 80px" class="flex-grow-0" @change="handleChangePageSize">
            </v-select>
            <span class="ml-2">Entries per page</span>
        </div>
        <div class="col-6 ps-pagination right section__pagination">
            <v-pagination v-model="meta.page" :length="fileDetails && fileDetails.pagesCount ? fileDetails.pagesCount : 1"
                :total-visible="7" color="#C29B40" @input="handleChangePageNum"></v-pagination>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import { META } from "~/ultilities/contants/media"
import qs from 'qs'
export default {
    name: 'TablePagination',
    data() {
        return {
            meta: META,
        }
    },
    computed: {
        ...mapState({
            files: (state) => state.media.files,
            folderData: (state) => state.media.folderData,
            currentFolder: (state) => state.media.currentFolder,
            fileDetails: (state) => state.media.fileDetails,
        }),
    },
    mounted() {
    },
    methods: {
        handleChangePageNum(page) {
            this.meta.page = page
            this.getPictureWithPage()
        },
        handleChangePageSize(pageSize) {
            this.meta.pageSize = pageSize
            this.meta.page = 1
            this.getPictureWithPage()
        },
        getPictureWithPage() {
            const param = qs.stringify({
                folderId: this.currentFolder && this.currentFolder.id ? this.currentFolder.id : 0,
                arrPicType: '["Original"]',
                onlyWebp: false,
                pageIndex: this.meta.page ? this.meta.page : 1,
                pageSize: this.meta.pageSize ? this.meta.pageSize : 10
            })
            this.$store.dispatch("media/getPictureByFolderId", param)
        }
    }
}
</script>
<style lang="scss" scoped>
.section__footer {
    display: flex;
    margin-top: 1.2rem;

    &-page-size {
        display: flex;
        padding: 1.2rem 0;
        align-items: center;

        .flex-grow-0 {
            background-color: #fff;
        }
    }

    .section__pagination {
        padding: 1.2rem 0;
    }

    .col-6 {
        margin: 0;
    }
}
</style>
