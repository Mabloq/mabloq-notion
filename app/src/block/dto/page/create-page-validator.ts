import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from '@nestjs/class-validator';
import { BlockEnum } from 'src/block/schemas/common/block-enum';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
export function IsPropertyValue(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPropertyValue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(data, args: ValidationArguments) {
          console.log('data', data);
          const results = getErrorTypes(data);
          return results.every((r) => r == 'SAFE');
        },
        defaultMessage(args?: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          //   console.log(args.object);
          //   console.log(relatedValue);

          return `${getErrorTypes(relatedValue)
            .filter((v) => v != 'SAFE')
            .join(', ')}`;
        },
      },
    });
  };
}
function getErrorTypes(properties: Record<string, any>) {
  const results = Object.keys(properties).map((k) => {
    const value = properties[k];

    if ('type' in value) {
      switch (value.type) {
        case 'rich_text':
          const rConfig: ValidationPropertyConfig = {
            property: value.type,
            type: 'nested',
            fields: [
              { name: 'plain_text', type: 'string' },
              { name: 'annotation', type: 'object' },
              { name: 'type', type: 'string' },
              { name: 'text', type: 'object' },
            ],
          };
          return validateProperty(value, rConfig);
        case 'title':
          const tConfig: ValidationPropertyConfig = {
            property: value.type,
            type: 'nested',
            fields: [
              { name: 'type', type: 'string' },
              { name: 'title', type: 'object' },
            ],
            nestedField: {
              property: 'title',
              fields: [
                { name: 'plain_text', type: 'string' },
                { name: 'annotation', type: 'object' },
                { name: 'type', type: 'string' },
                { name: 'text', type: 'object' },
              ],
            },
          };
          return validateProperty(value, tConfig);
        case 'number':
          const nConfig: ValidationPropertyConfig = {
            property: value.type,
            type: 'number',
            fields: [
              { name: 'type', type: 'string' },
              { name: 'number', type: 'string' },
            ],
          };
          return validateProperty(value, nConfig);
        case 'select':
          const sConfig: ValidationPropertyConfig = {
            property: value.type,
            type: 'number',
            fields: [
              { name: 'type', type: 'string' },
              { name: 'select', type: 'object' },
            ],
          };
          return validateProperty(value, sConfig);
        default:
          return 'DANGER';
      }
    }
    return false;
  });
  return results;
}

interface ValidationPropertyConfig {
  property: string;
  type: string;
  fields: { name: string; type: string }[];
  nestedField?: { property: string; fields: { name: string; type: string }[] };
}

function validType(value, type_name) {
  return typeof value == type_name;
}

function validTypeMessage(property, value, type_name) {
  return typeof value == type_name
    ? 'SAFE'
    : `${property} is supposed to be '${type_name}', but ${typeof value} found.`;
}
function validateProperty(value: any, config: ValidationPropertyConfig) {
  const vkeys = Object.keys(value);
  const allowed_keys = vkeys.every((v) =>
    config.fields.map((f) => f.name).includes(v),
  );
  const every_keys = config.fields.every((v) => vkeys.includes(v.name));
  const wrongKeys = vkeys.filter(
    (v) => !config.fields.map((f) => f.name).includes(v),
  );

  const correctTypes = vkeys.every((v) => {
    const field = config.fields.find((f) => f.name == v);
    if (typeof field != 'undefined') {
      return validType(value, field.type);
    } else {
      return false;
    }
  });
  const invalidTypes = vkeys
    .map((v) => {
      const field = config.fields.find((f) => f.name == v);
      if (typeof field != 'undefined') {
        return validTypeMessage(v, value[v][field.name], field.type);
      } else {
        return 'NOT FOUND';
      }
    })
    .filter((m) => !['NOT FOUND', 'SAFE'].includes(m));

  if (typeof config.nestedField != 'undefined') {
    const nkeys = Object.keys(value[config.nestedField.property]);
    const nallowed_keys = nkeys.every((v) =>
      config.nestedField.fields.map((f) => f.name).includes(v),
    );
    const nevery_keys = config.nestedField.fields.every((v) =>
      nkeys.includes(v.name),
    );
    const nwrongKeys = nkeys.filter(
      (v) => !config.nestedField.fields.map((f) => f.name).includes(v),
    );
    return allowed_keys &&
      every_keys &&
      nallowed_keys &&
      nevery_keys &&
      correctTypes
      ? 'SAFE'
      : `[ properties.${config.nestedField.property} - { invalid properties: '${nwrongKeys}' }  ]`;
  } else {
    return allowed_keys && every_keys && correctTypes
      ? 'SAFE'
      : `[ properties.${config.property} - { invalid properties: '${wrongKeys}', invalid types: ${invalidTypes} } ]`;
  }
}
