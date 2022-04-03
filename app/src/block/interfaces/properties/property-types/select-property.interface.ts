import { BasePropertyInterface } from '../property.interface';

export interface SelectPropertyInterface extends BasePropertyInterface {
  select: { name: string };
}
