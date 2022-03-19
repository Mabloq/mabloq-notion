import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RichTextSchema, RichText } from '../../common/rich-text.schema';

@Schema()
export class RichTextProperty {
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichText[];
}

export const RichTextPropertySchema =
  SchemaFactory.createForClass(RichTextProperty);
export type TitlePropertyDocument = RichTextProperty & Document;
