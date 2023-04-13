// // Store Login Info
// this.loginService.getLoggedInUserDetails(this.loginModel.userCredential).subscribe(
//     (res: any) => {
//         // User ALL Details
//         new EncryptedStorage().setItem(
//             new GlobalConfig().userAllDetailsLSName, 
//             JSON.stringify(res),
//             isRememberMe ? false : true
//         );
//         // Color Theme
//         new EncryptedStorage().setItem(
//             new GlobalConfig().colourThemeLSName,
//             res.colourThemeId,
//             isRememberMe ? false : true
//         );
//         // User Full Name ID
//         new EncryptedStorage().setItem(
//             new GlobalConfig().userDetailsLSName, 
//             `${res.firstName} ${res.lastName}`,
//             isRememberMe ? false : true
//         );
//         // UserName
//         new EncryptedStorage().setItem(
//             new GlobalConfig().userNameLSName, 
//             res.userName,
//             isRememberMe ? false : true
//         );
//         // User Login ID
//         new EncryptedStorage().setItem(
//             new GlobalConfig().userLogginIdLSName, 
//             res.userLoginId,
//             isRememberMe ? false : true
//         );
//         // User ID
//         new EncryptedStorage().setItem(
//             new GlobalConfig().userIdLSName, 
//             res.userId,
//             isRememberMe ? false : true
//         );
//         // ORG ID
//         new EncryptedStorage().setItem(
//             new GlobalConfig().organisationIdLSName, 
//             res.organizationId,
//             isRememberMe ? false : true
//         );
//         // Role ID
//         new EncryptedStorage().setItem(
//             new GlobalConfig().roleIdLSName, 
//             res.roleId,
//             isRememberMe ? false : true
//         );
//     }
// )