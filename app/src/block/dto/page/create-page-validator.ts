import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { BlockEnum } from 'src/block/schemas/common/block-enum';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
import { RichTextDto } from '../extra-models/common/rich-text.dto';
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
          const results = getErrorTypes(data);
          return results.every((r) => r == 'SAFE');
        },
        defaultMessage(args?: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

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
          const cl = new RichTextDto();
          console.log('cl', Object.getOwnPropertyNames(cl));
          console.log('cl2', Object.getPrototypeOf(cl));
          const rConfig: ValidationPropertyConfig = {
            property: value.type,
            type: 'nested',
            fields: [
              { name: 'plain_text', type: 'string' },
              { name: 'annotation', type: 'object' },
              { name: 'type', type: 'string' },
              { name: 'text', type: 'object' },
            ],
            nestedField: {
              property: 'text',
              fields: [
                { name: 'text', type: 'string' },
                { name: 'link', type: 'string' },
              ],
            },
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
              { name: 'number', type: 'number' },
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
      return validType(value[v], field.type);
    } else {
      return false;
    }
  });
  const invalidTypes = vkeys
    .map((v) => {
      const field = config.fields.find((f) => f.name == v);
      if (
        typeof field != 'undefined' &&
        typeof value[field.name] != 'undefined'
      ) {
        return validTypeMessage(v, value[field.name], field.type);
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
    const ncorrectTypes = nkeys.every((v) => {
      const field = config.nestedField.fields.find((f) => f.name == v);
      if (typeof field != 'undefined') {
        return validType(
          value[config.nestedField.property][field.name],
          field.type,
        );
      } else {
        return false;
      }
    });
    const ninvalidTypes = nkeys
      .map((v) => {
        const field = config.nestedField.fields.find((f) => f.name == v);
        if (
          typeof field != 'undefined' &&
          typeof field.name != 'undefined' &&
          typeof value[config.nestedField.property][field.name] != 'undefined'
        ) {
          return validTypeMessage(
            v,
            value[config.nestedField.property][field.name],
            field.type,
          );
        } else {
          return 'NOT FOUND';
        }
      })
      .filter((m) => !['NOT FOUND', 'SAFE'].includes(m));
    return allowed_keys &&
      every_keys &&
      nallowed_keys &&
      nevery_keys &&
      ncorrectTypes
      ? 'SAFE'
      : `[ properties.${config.property}.${config.nestedField.property} - { ${
          !nallowed_keys || !nevery_keys
            ? 'invalid properties: ' + wrongKeys.concat(nwrongKeys) + ', '
            : ''
        }${
          !ncorrectTypes && ninvalidTypes.length
            ? 'invalid types: ' + invalidTypes.concat(ninvalidTypes) + ' '
            : ''
        }}]`;
  } else {
    return allowed_keys && every_keys && correctTypes
      ? 'SAFE'
      : `[ properties.${config.property} - { ${
          !allowed_keys || !every_keys
            ? 'invalid properties:' + wrongKeys + ', '
            : ''
        }${correctTypes == false ? 'invalid types:' + invalidTypes : ''}}]`;
  }
}
