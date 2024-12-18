import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidSchema(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidSchema',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value.w3cUri || value.anonCredsDefinitionId;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Schema must have either w3cUri or anonCredsDefinitionId';
        },
      },
    });
  };
}