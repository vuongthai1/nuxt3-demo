export const convertRawToSiteData = (data) => {
    return {
        id: data.id ? data.id : 0,
        siteName: data.siteName ? data.siteName : "",
        siteTitle: data.siteTitle ? data.siteTitle : "",
        //logo: "",
        hostName: data.hostName ? data.hostName : "",
        //regionFID: 0,
        metaTitle: data.metaTitle ? data.metaTitle : "",
        //metaKeyword: data.metaKeyword ? data.metaKeyword : "",
        metaDescription: data.metaDescription ? data.metaDescription : "",
        siteDescription: data.siteDescription ? data.siteDescription : "",
        active: data.active,
        deleted: data.deleted ? data.deleted : false,
        isMultilingual: data.isMultilingual ? data.isMultilingual : false
    }
}
