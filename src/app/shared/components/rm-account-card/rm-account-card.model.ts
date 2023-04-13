export interface ISplitButtonConfig {
    disableSplitBtn: boolean;
    splitBtnItem: IRMButtonActionItemConfig[]
}

export interface IRMButtonActionItemConfig {
    name: string;
    disabled?: boolean;
    icon?: string;
    isSeprator?: boolean;
    child?:IRMButtonActionItemConfig[]
}