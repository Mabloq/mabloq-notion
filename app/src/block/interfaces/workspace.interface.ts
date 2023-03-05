import { HigherOrderBlockInterface } from './high-order-block.interface';
import { PropertyInterface } from './properties/property.interface';

export interface WorkspaceInterface extends HigherOrderBlockInterface {
  properties: {
    title: PropertyInterface;
  };
  has_content: boolean;
  content?: string[];
}
