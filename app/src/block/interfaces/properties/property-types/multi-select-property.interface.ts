import { BasePropertyInterface } from '../property.interface';

export interface MultiSelectPropertyInterface extends BasePropertyInterface {
  multi_select: { name: string }[];
}
