import { ITextConfig } from "../../../rm-input/rm-input.model";
import { ISelectConfig } from "../../../rm-select-box/rm-select-box.model";

export class _GlobalFilterItemsConfig {
    textConditionTypeConfig: ISelectConfig = {
        fieldKey: "conditionType",
        attributes: {
          label: "Select Condition"
        },
        dataKey: "label",
        returnKey: "value",
        options: [
          {
            label: "Contains",
            value: "contains",
          },
          {
            label: "Does not contains",
            value: "does-not-contains",
          },
          {
            label: "Equals",
            value: "equals",
          },
          {
            label: "Not Equals",
            value: "not-equals",
          },
          {
            label: "Begins with",
            value: "begins-with",
          },
          {
            label: "Ends with",
            value: "ends-with",
          },
        ],
    };

    numberConditionTypeConfig: ISelectConfig = {
      fieldKey: "conditionType",
      attributes: {
        label: "Select Condition"
      },
      dataKey: "label",
      returnKey: "value",
      options: [
        {
          label: "Equals",
          value: "equals",
        },
        {
          label: "Not Equals",
          value: "not-equals",
        },
        {
          label: "More Than",
          value: "more-than",
        },
        {
          label: "Less Than",
          value: "less-than",
        },
        {
          label: "More Than Equals",
          value: "more-than-equals",
        },
        {
          label: "Less Than Equals",
          value: "less-than-equals",
        },
      ],
  };

  textSearchConfig: ITextConfig = {
      fieldKey: 'searchBy',
      attributes: {
          label: 'Type Value',
          isMandatory: false,
      }
  }

  numberSearchConfig: ITextConfig = {
    fieldKey: 'searchBy',
    attributes: {
        type: 'number',
        label: 'Type Value',
        isMandatory: false,
    }
  }

  rollingXDaysConfig: ITextConfig = {
    fieldKey: 'rollingXDays',
    attributes: {
        placeholder: 'X',
        isSmall: true,
        type: 'number',
        isMandatory: false,
    }
  }

  nextXDaysConfig: ITextConfig = {
    fieldKey: 'nextXDays',
    attributes: {
        placeholder: 'X',
        isSmall: true,
        type: 'number',
        isMandatory: false,
    }
  }

  fromXDateConfig: ITextConfig = {
    fieldKey: 'fromXDate',
    attributes: {
      label: 'Select Date',
      placeholder: 'MM/DD/YYYY',
      type: 'datepicker',
      isMandatory: false,
      maxDate: new Date()
    }
  }
}