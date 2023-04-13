# RM Chip Component

> Custom Chip Component created for RM Project.

It includes functionalities such as:
1. Prefix Icon.
2. Custom Icon Color.
3. Clickable.
4. Draggable.
5. Removable.
6. Two Line Chip
## Configurations:

1. Input [Property Binding] Parameters:
   - config: IChipConfig.
   - value: "Chip Value"
   - secondaryValue: "Use it to enable Two Line Chip, Works only with largeChip"

2. Output (Event Emiters) Parameters:
   - onClick: Emit Event when user click on button.
   - onRemove: Emit Event when user remove the chip.


## Model's:

- Class IChipConfig 
```
ISplitButtonConfig: {
    icon?: string;
    iconColor?: string;
    class?: string;
    colorCode?: string;
    colorClass?: string;
    isLargeChip: boolean;
    removable: boolean;
    draggable: boolean;
    clickable: boolean;
}
```
