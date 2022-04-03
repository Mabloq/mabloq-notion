import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class PageParent {
  @Prop()
  database_id: string;
}
export const PageParentSchema = SchemaFactory.createForClass(PageParent);
