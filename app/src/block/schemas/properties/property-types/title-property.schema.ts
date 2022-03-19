import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RichTextSchema, RichText } from '../../common/rich-text.schema';

@Schema()
export class TitleProperty {
  @Prop({ _id: false, type: [RichTextSchema] })
  title: RichText[];
}

export const TitlePropertySchema = SchemaFactory.createForClass(TitleProperty);
export type TitlePropertyDocument = TitleProperty & Document;
