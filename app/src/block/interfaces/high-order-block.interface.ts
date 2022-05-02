import { ParentInerface } from './common/parent.interface';
import { PropertyInterface } from './properties/property.interface';
import { FileObjectInterface } from './common/file-object.interface';
export interface HigherOrderBlockInterface {
  id?: string;
  object: string;
  parent?: ParentInerface;
  parent_id?: string;
  archived?: boolean;
  cover?: FileObjectInterface;
  icon?: FileObjectInterface;
  created_time: string;
  created_by: string;
  last_edited_time: string;
  last_edited_by: string;
}
