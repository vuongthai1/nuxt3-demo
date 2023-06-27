export const isAdmin = (role) => {
    return (
        (role.systemName === "Developer" && role.isSystemRole) ||
        (role.systemName === "Administrator" && role.isSystemRole)
    )
}

export const isManager = (role) => {
    return role.systemName === "Manager" && !role.isSystemRole
}

export const isEditor = (role) => {
    return role.systemName === "Editor" && !role.isSystemRole
}
