import { ParentInerface } from './common/parent.interface';
import { FileObjectInterface } from './common/file-object.interface';
import { ObjectEnum, ObjectType } from '../schemas/common/object-enum';
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
