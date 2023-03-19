import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
import { RichTextPropertyInterface } from 'src/block/interfaces/properties/property-types/rich-text-property.interface';
import { RichTextSchema, RichText } from '../../common/rich-text.schema';

@Schema()
export class RichTextProperty implements RichTextPropertyInterface {
  type: string;
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichTextInterface[];
}

export const RichTextPropertySchema =
  SchemaFactory.createForClass(RichTextProperty);
export type TitlePropertyDocument = RichTextProperty & Document;
