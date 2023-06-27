export const convertRawToSiteData = (data) => {
    return {
        menuID: data.menuID ? data.menuID : 0,
        siteFID: data.siteFID ? data.siteFID : 0,
        parentFID: data.parentFID ? data.parentFID : 0,
        defaultName: data.defaultName ? data.defaultName : "",
        slug: data.slug ? data.slug : "",
        isPublished: data.isPublished ? data.isPublished : false,
        deleted: data.deleted ? data.deleted : false,
        publishDate: data.publishDate ? data.publishDate : "",
        createdBy: data.createdBy ? data.createdBy : "",
        createdDate: data.createdDate ? data.createdDate : "",
        lastModifiedDate: data.lastModifiedDate ? data.lastModifiedDate : "",
        lastModifiedBy: data.lastModifiedBy ? data.lastModifiedBy : "",
        linkType: data.linkType ? data.linkType : "",
        linkURL: data.linkURL ? data.linkURL : "",
        linkValue: data.linkValue ? data.linkValue : "",
        dynamicLinkType: data.dynamicLinkType ? data.dynamicLinkType : "",
        dynamicLinkURL: data.dynamicLinkURL ? data.dynamicLinkURL : "",
        dynamicLinkValue: data.dynamicLinkValue ? data.dynamicLinkValue : "",
        optionalValue: data.optionalValue ? data.optionalValue : "",
        navigation: data.navigation ? data.navigation : "",
        linkOpenNewTab: data.linkOpenNewTab ? data.linkOpenNewTab : "",
    }
}

