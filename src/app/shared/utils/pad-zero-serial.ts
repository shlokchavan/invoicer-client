export const padZeroSerial = (params: any) => {
    return params.node.rowIndex < 9 ? `0${params.node.rowIndex + 1}.` : `${params.node.rowIndex + 1}.`
}