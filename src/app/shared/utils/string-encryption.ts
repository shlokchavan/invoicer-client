// Encrypt Email/ Phone
export const EncryptSensitiveInfo = (str = '') => {
    return str.split("").map(char => Math.random() > 0.5 ? "*" : char).join("");
}