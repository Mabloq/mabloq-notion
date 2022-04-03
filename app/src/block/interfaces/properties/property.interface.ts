import { NumberConfigInterface } from './property-config/number-config.interface';
import { SelectConfigInterface } from './property-config/select-config.interface';
import { MultiSelectPropertyInterface } from './property-types/multi-select-property.interface';
import { NumberPropertyInterface } from './property-types/number-property.interface';
import { RichTextPropertyInterface } from './property-types/rich-text-property.interface';
import { SelectPropertyInterface } from './property-types/select-property.interface';

type PropertyType = 'rich_text' | 'number' | 'select' | 'multi_select';
export interface BasePropertyInterface {
  object: 'property_item';
  id: string;
  type: PropertyType;
}

export type PropertyInterface =
  | RichTextPropertyInterface
  | NumberPropertyInterface
  | SelectPropertyInterface
  | MultiSelectPropertyInterface;

export type PropertyConfigInterface =
  | RichTextPropertyInterface
  | NumberConfigInterface
  | SelectConfigInterface;
