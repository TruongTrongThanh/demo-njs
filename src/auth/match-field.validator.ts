import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';

export function MatchField(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [property],
        validator: MatchFieldConstraint,
      });
    };
  }

@ValidatorConstraint({ name: 'MatchField', async: false })
@Injectable()
export class MatchFieldConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    const [relatedField] = args.constraints;
    const object = args.object;

    return value === object[relatedField];
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedField] = args.constraints;
    return `${args.property} must match ${relatedField}`;
  }
}