export const snackbarTimeout = 2000

export const getActiveEntries = (payload) => {
    return payload.length > 0 ? payload.filter((p) => p.deleted === false && p.active) : []
}

export const getDeletedEntries = (payload) => {
    return payload.length > 0 ? payload.filter((p) => p.deleted) : []
}

export const getParentEntries = (data, key) => {
    return data.length > 0
        ? data
              .map((item) => {
                  return item[key] === 0
                      ? {
                            ...item,
                            children: data.filter((t) => t[key] === item.id)
                        }
                      : { ...item, children: [] }
              })
              .filter((item) => item[key] === 0)
        : []
}

export const convertParentEntriesChildren = (data, key, ids) => {
    return data.length > 0
        ? data
              .map((item) => {
                  const children = data.filter((t) => {
                      return !!(t.id !== t[key] && t[key] === item.id)
                  })

                  if (children.length) {
                      item.children = children
                  }

                  return item
              })
              .filter((obj) => {
                  return !!(obj.id === obj[key] || !ids.includes(obj[key]))
              })
        : []
}
