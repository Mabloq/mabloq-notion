import { HigherOrderBlockInterface } from './high-order-block.interface';
import { PropertyInterface } from './properties/property.interface';
export interface PageInterface extends HigherOrderBlockInterface {
  properties: {
    title: PropertyInterface;
    [key: string | symbol]: PropertyInterface;
  };
  has_content: boolean;
  content?: string[];
}
