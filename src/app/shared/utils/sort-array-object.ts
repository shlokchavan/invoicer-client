export const sortArrayObjectByKey = (data: any, key: string) => {
    return data.sort((a: any, b: any) => (a[key] - b[key]));
}