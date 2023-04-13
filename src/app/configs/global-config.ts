export class GlobalConfig {
    themeColors = []
    // LocalStorage Name
    bookmarkLSName = "_rm-b";
    authTokenLSName = "_rm-at";
    authRefreshTokenLSName = "_rm-rat";
    colourThemeLSName = "_rm-ct";
    availableThemesLSName = "rm-oat"
    userAllDetailsLSName = "_rm-sad";
    userOrgTypeLSName = "_rm-uot";
    userModulesSubmodulesLSName = "_rm-snd";
    userDetailsLSName = "_rm-sud";
    userNameLSName = "_rm-sund";
    userIdLSName = "_rm-sid";
    userLogginIdLSName = "_rm-slid";
    organisationIdLSName = "_rm-sod";
    organisationTypeLSName = "_rm-ort";
    usersListLSName = "_rm-usrlst";
    roleIdLSName = "_rm-srd";
    responseCodesClientMaster = "_rm-rc";
    accountsList = "_rm-aclp"
    tokenTimeToReset = "_rm-tttr"
    // important routes
    loginRoute = "/auth/login";
    profileRoute = "/my-account";
    // dashboardRoute = "/dashboard";
    dashboardRoute = "/manage-master/sp";
}