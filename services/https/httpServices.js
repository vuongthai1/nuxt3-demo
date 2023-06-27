export const appPagination = {
    defaultPageSize: 10,
    pageSizes: [10, 20, 50, 100],
    maximumPageSize: 9999
}

export const enabledEntriesParams = {
    page: 1,
    pageSize: appPagination.maximumPageSize,
    data: {
        active: true,
        deleted: false
    }
}
