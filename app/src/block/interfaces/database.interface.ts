import { PropertyConfigInterface } from './properties/property.interface';
import { HigherOrderBlockInterface } from './high-order-block.interface';

export interface DatabaseInterface extends HigherOrderBlockInterface {
  properties: {
    title: PropertyConfigInterface;
    [key: string | symbol]: PropertyConfigInterface;
  };
}
