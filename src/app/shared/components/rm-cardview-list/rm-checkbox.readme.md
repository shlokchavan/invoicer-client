# RM Checkbox Component

## Configurations:

1. Input [Property Binding] Parameters:
   - config: ICheckboxConfig

2. Output (Event Emiters) Parameters:
   - onChange: Emit Event when user change checkbox state.


## Model's:

- Class ICheckboxConfig 
```
ICheckboxConfig: {
    isChecked?: boolean;
    attributes: ICheckboxAttribute;
}
```
- Class ICheckboxAttribute 
```
ICheckboxAttribute: {
    disable?: boolean;
    isMandatory?: boolean;
    indeterminate?: boolean;
    label?: string;
    class?: string;
    labelPosition?: string;
}
```