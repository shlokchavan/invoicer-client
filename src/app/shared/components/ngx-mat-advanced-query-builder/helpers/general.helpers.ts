import {QueryField} from '../models';

export const isEven = (n: number): boolean => n % 2 === 0;

export const getEnumKeyByEnumValue = (myEnum: any, enumValue: string) => {
  const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
};

export const transformValue = (value: any, type: string) => {
  let returnValue;
  if(typeof value == "string" && value.charAt(0)=="#" && value.charAt(value.length - 1)=="#") {
    return `${value}`;
  }
  switch (type) {
    case 'boolean':
      returnValue = transformToBoolean(value);
      break;
    case 'Integer':
    case 'integer':
      returnValue = transformToNumber(value);
      break;
    case 'Date':
    case 'date':
      returnValue = transformToDate(value);
      break;
    case 'List':
    case 'list':
      returnValue = transformListToString(value);
      break;
    default:
      // if (`${value}`.includes(',')) {
      //   returnValue = `${value}`.split(',');
      // } else {
      // }
      returnValue = `${value}`;
      
      break;
  }
  return returnValue;
};

export const isDefined = (value: any): boolean => value !== undefined;

export const transformToNumber = (value: any) => {
  if (`${value}`.includes(',')) {
    return `${value}`.split(',').map(v => {
      if (v !== null) {
        return Number(v.trim());
      }

      return v;
    }).filter(v => v !== undefined);
  } else {
    return Number(value);
  }
};

export const transformToBoolean = (value: any) => {
  if (`${value}`.includes(',')) {
    return `${value}`.split(',').map(v => {
      if (v !== null) {
        return (`${v}`.trim() === 'true');
      }

      return v;
    }).filter(v => v !== undefined);
  } else {
    return (`${value}` === 'true');
  }
};

export function transformListToString(values: any[]) {
  if(values && Array.isArray(values))
  return values.toString()
  else return values
}

export const transformToDate = (value: any): any | undefined => {
  if (value instanceof Array) {
    return value.map(v => transformToDate(v));
  } else {
    try {
      return new Date(value);
    } catch (e) {
      return undefined;
    }
  }
};

export const filterFieldNames = (partialValue: string | null, fields: QueryField[]): QueryField[] => {
  if (!!partialValue && partialValue.trim().length > 0) {
    const lowerValue = partialValue.toLowerCase();

    return fields.filter(f => {
      if (!!f.label) {
        return f.label.toLowerCase().includes(lowerValue);
      }

      return f.name.toLowerCase().includes(lowerValue);
    });
  }

  return fields;
};

export const getFieldType = (field: QueryField): string => {
  if (!!field && field.type) {
    return titleCase(field.type);
  }

  return 'String';
};

export const titleCase = (phrase: string): string => phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
