import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class PageParent {
  @Prop()
  page_id: string;
}
export const PageParentSchema = SchemaFactory.createForClass(PageParent);
