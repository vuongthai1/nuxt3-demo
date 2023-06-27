export const convertRawToBlogData = (data) => {
    return {
        id: data.id ? data.id : 0,
        siteFID: 0,
        defaultName: data.defaultName ? data.defaultName : "",
        // slug: "test",
        metadata: data.metadata ? data.metadata : "",
        thumbnailImageID: 0,
        thumbnailImageUrl: "",
        isMultilingual: data.isMultilingual ? data.isMultilingual : false,
        deleted: data.deleted ? data.deleted : false,
        published: data.published ? data.published : false
        // publishedOn: "2022-10-27T02:30:28.630Z"
    }
}

export const getActiveEntries = (payload) => {
    return payload.filter((p) => p.deleted === true)
}

export const getDeletedEntries = (payload) => {
    return payload.filter((p) => p.deleted)
}
