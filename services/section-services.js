export const convertRawToSiteData = (data) => {
    return {
        id: data.id ? data.id : 0,
        sectionName: data.sectionName ? data.sectionName : "",
        slug: data.slug ? data.slug : "",
        description: data.description ? data.description : "",
        active: data.active,
        deleted: data.deleted ? data.deleted : false,
        isMultilingual: data.isMultilingual ? data.isMultilingual : false,
        metadata: data.metadata ? data.metadata : "",
        sectionTemplateFID: data.sectionTemplateFID ? data.sectionTemplateFID : ""
    }
}

export const checkUpdateSuccess = (payload) => {
    console.log({ payload })
    return payload.every((item) => item === true)
}
