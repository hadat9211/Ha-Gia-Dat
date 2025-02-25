import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'string-or-number', async: false })
export class IsNumberOrString implements ValidatorConstraintInterface {
  validate(text: number[] | string, _arguments: ValidationArguments) {
    if (typeof text === 'string' && text === 'all') return true;
    for (const item of text) {
      if (typeof item !== 'number' || Number.isNaN(item)) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(arguments_: ValidationArguments) {
    return `${arguments_.property} must be an array number and greater than 1 or string`;
  }
}

@ValidatorConstraint({ name: 'string-or-number-require', async: false })
export class IsNumberOrStringRequire implements ValidatorConstraintInterface {
  validate(text: number[] | string | undefined, _arguments: ValidationArguments) {
    if (text === undefined) return false;
    if (typeof text === 'string' && text === 'all') return true;
    for (const item of text) {
      if (typeof item !== 'number' || Number.isNaN(item)) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(arguments_: ValidationArguments) {
    return `${arguments_.property}  must be an array number or string and not empty`;
  }
}
