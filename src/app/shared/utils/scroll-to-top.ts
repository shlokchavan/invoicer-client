export const scrollToElement = (element: any) => {
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}