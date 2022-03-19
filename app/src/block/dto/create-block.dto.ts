export class CreateBlockDto {
  object: 'block';
  type: string;
  created_time: string;
  updated_by: string; //TODO: Partial<User>
  last_edited_time: string;
  has_children: boolean;
  [key: string]: any;
}
