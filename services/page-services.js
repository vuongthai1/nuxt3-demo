export const convertRawToPageData = (data) => {
    console.log({data})
    return data.length > 0
        ? data.map((item) => {
              return {
                  id: item.section.id ? item.section.id : 0,
                  idMapping: item.id ? item.id : "",
                  isActive: item.active ? item.active : false,
                  description: item.section.description ? item.section.description : "",
                  isMultilingual: item.isMultilingual ? item.isMultilingual : false,
                  order: item.orderBy ? item.orderBy : 0,
                  sectionName: item.section.sectionName ? item.section.sectionName : "",
                  sectionTemplateFID: item.sectionTemplateFID ? item.sectionTemplateFID : 0,
                  siteFID: item.siteFID ? item.siteFID : 0,
                  siteName: item.siteName ? item.siteName : "",
                  slug: item.section.slug ? item.section.slug : ""
              }
          })
        : []
}

export const getActiveEntries = (payload) => {
    return payload.filter((p) => p.deleted === false)
}

export const getDeletedEntries = (payload) => {
    return payload.filter((p) => p.deleted)
}
