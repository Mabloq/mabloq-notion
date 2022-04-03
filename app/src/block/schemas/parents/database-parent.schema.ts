import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ _id: false })
export class DatabaseParent {
  @Prop()
  database_id: string;
}
export const DatabaseParentSchema =
  SchemaFactory.createForClass(DatabaseParent);
