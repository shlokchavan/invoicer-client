# RM Bookmark Component

> Component that hold module bookmark / pin module on header. It supports upto 4 modules and can drag - drop to change it's order.

## Configurations:

1. Input [Property Binding] Parameters:
   - bookmarkChips: IRMNavItemConfig[] holds array of navigaion config.

2. Output (Event Emiters) Parameters:
   - onClick: Emit Event when user click on bookmark chip.
   - onDragDrop: Emit Event when user change order of bookmark-chip by drag and drop.


## Model's:

- Class IRMNavItemConfig 
```
IRMNavItemConfig: {
    moduleId: any;
    label: string;
    icon?: string;
    isWIP?: boolean;
    route?: string;
    showSubHeader?: boolean;
    IHeaderBreadCrumb?: string;
    isSelected?: boolean;
    children?: IRMNavItemConfig[];
}
```