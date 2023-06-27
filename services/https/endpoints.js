export const httpEndpoint = {
    auth: {
        login: "/api/Authen/Login",
        logout: "/api/Authen/logout",
        getAuthenInfo: "/api/Authen/info",
        initAzure: 'api/Authen/init-azure-authen',
        getAzureToken: 'api/Authen/exchange-token',
    },
    sites: {
        root: "api/sites",
        siteLayouts: "api/site-layouts",
        getEntries: "api/sites",
        getEntryByID: "api/sites",
        updateEntry: "api/sites",
        createEntry: "api/sites",
        trashEntry: "api/sites",
        updateSiteStatus: "api/sites/set-active-sites"
    },
    templates: {
        root: "api/section-templates",
        getEntries: "api/section-templates",
        duplicateEntries: "api/section-templates/duplicate",
        getEntryByID: "api/section-templates",
        updateEntry: "api/section-templates",
        createEntry: "api/section-templates",
        trashEntry: "api/section-templates",
        getByLayoutID: "api/section-templates/get-by-layout-id",
        getSectionTemplateByID: "api/section-templates/GetSectionTemplateByID"
    },
    templateFields: {
        root: "api/section-template-details",
        getByTemplateID: "api/section-template-details/get-by-template-id",
        bulkUpdate: "api/section-template-details/bulk-update",
        getEntries: "api/section-template-details",
        getEntryByID: "api/section-template-details",
        updateEntry: "api/section-template-details",
        createEntry: "api/section-template-details",
        trashEntry: "api/section-template-details",
        deleteEntry: "api/section-template-details"
    },

    contentTypes: "api/content-types",

    roles: {
        getEntries: "/api/user-roles",
        getEntryByID: "api/UserRoles/GetItem",
        updateEntry: "api/UserRoles/Update",
        createEntry: "api/UserRoles/Create",
        trashEntry: "api/UserRoles/Delete"
    },

    medias: {
        getEntriesFolder: "api/Folders",
        getEntriesPicture: "api/Pictures",
        getEntriesVideos: "api/videos",
        deleteFolder: "api/Folders",
        deletePictures: "api/Pictures",
        deleteVideos: "api/Videos",
        createFolder: "api/Folders",
        createPicture: "api/Pictures",
        createVideos: "api/Videos",
        updateFolder: "api/Folders"
    },
    documents: "/api/documents",
    blogs: {
        root: "api/blogs",
        getEntries: "api/blogs",
        getEntriesDetail: "api/blogs",
        updateEntry: "api/blogs",
        createEntry: "api/blogs",
        createEntryDetail: "api/BlogDetails/Create",
        deleteEntry: "api/blogs",
        updateEntryDetail: "api/BlogDetails/Update",
        createBlogCategories: "api/blog-categories/create-include-details",
        deleteBlogCategoriesByID: "api/blog-categories",
        getBlogCategoriesEntries: "/api/blog-categories/get-by-site-id",
        getBlogCategoriesByID: "api/blog-categories",
        updateBlogCategoriesByID: "api/blog-categories",
        blogCategoryMapping: "api/BlogCategoryMappings/Create",
        deleteBlogCategoryMapping: "api/BlogCategoryMappings/Delete",
        updateBlogItem: "/api/blogs/update-blog-items",
        getPostsBySiteFID: "/api/blogs/get-by-site-id"
    },
    menus: {
        root: "api/menus",
        getEntries: "api/menus",
        getEntryByID: "api/menus",
        getEntriesBySiteID: "api/menus/get-by-site-id",
        createEntry: "api/menus",
        updateEntry: "api/menus",
        trashEntry: "api/menus"
    },
    menuItems: {
        getMenuItemByMenuId: "api/menu-items/get-by-menu-id",
        getMenuItemById: "api/menu-items/get-by-id",
        createMenuItem: "api/menu-items",
        updateMenuItem: "api/menu-items",
        deleteMenuItem: "api/menu-items",
        getMenuParents: "api/menu-items/get-dropdown"
    },
    menuLanguages: {
        getEntries: "api/MenuLanguages/Search",
        updateEntry: "api/MenuLanguages/Update",
        createEntry: "api/MenuLanguages/Create",
        trashEntry: "api/MenuLanguages/MarkDelete"
    },
    users: {
        getEntries: "/api/Users",
        getEntryByID: "/api/Users",
        updateEntry: "/api/Users",
        createEntry: "/api/Users",
        deleteEntry: "/api/Users"
    },
    languages: {
        getEntries: "api/CommonLanguages/Search",
        getEntryByID: "api/CommonLanguages/GetItem",
        updateEntry: "api/CommonLanguages/Update",
        createEntry: "api/CommonLanguages/Create",
        deleteEntry: "api/CommonLanguages/MarkDelete"
    },
    pages: {
        root: "/api/pages",
        mapping: "/api/page-section-mappings",
        getEntries: "/api/pages",
        getEntryByID: "api/Pages/GetItem",
        createEntry: "/api/pages",
        updateEntry: "/api/pages",
        deleteEntry: "api/Pages/MarkDelete",
        updatePageDetailEntry: "api/Pages/UpdatePageDetail",
        mappingPageAndSections: "api/PageSectionMappings/Create",
        deleteMappingEntry: "api/PageSectionMappings/Delete",
        updateMappingEntry: "api/PageSectionMappings/Update",
        clonePage: "api/Pages/ClonePage",
        updatePageSection: "api/page-section-mappings",
        deletePageSection: "api/page-section-mappings",
        getPagesBySiteId: "/api/pages/get-by-site-id",
        sections: "api/page-section-mappings/get-by-pagefid",
        getBySiteId: "/api/pages/get-by-site-id",
        deletePage: "/api/pages",
        setPublish: "/api/pages/set-publish",
        duplicatePage: "/api/pages/clone"
    },
    sections: {
        root: "api/sections",
        getEntries: "api/sections/SearchModel",
        getEntryByID: "api/sections/GetItemById",
        updateEntry: "api/sections/Update",
        createEntry: "api/sections/Create",
        trashEntry: "api/sections/MarkDelete",
        bulkCreateEntry: "api/sections/bulk-create-by-template",
        bulkCreate: "api/sections/bulk-create-by-template",
        setPublish: "/api/sections/set-publish"
    },
    sectionFields: {
        root: "api/section-details",
        getEntries: "api/SectionDetail/Search",
        getEntryByID: "api/SectionDetail/GetItem",
        updateEntry: "api/SectionDetail/Update",
        createEntry: "api/SectionDetail/Create",
        bulkCreate: "api/section-details/bulk-create",
        trashEntry: "api/SectionDetail/MarkDelete",
        deleteEntry: "api/SectionDetail/delete"
    },
    statistic: {
        dashboard: "api/Statistic/GetDashboardStatistic"
    }
}
