import { HigherOrderBlockInterface } from './high-order-block.interface';
import { PropertyInterface } from './properties/property.interface';
import { Types } from 'mongoose';
export interface PageInterface extends HigherOrderBlockInterface {
  properties: Record<string, PropertyInterface>;
  has_content: boolean;
  content?: Types.ObjectId[];
}
