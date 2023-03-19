import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
import { TitlePropertyInterface } from 'src/block/interfaces/properties/property-types/title-property.interface';
import { RichTextSchema, RichText } from '../../common/rich-text.schema';
import { Property } from '../property.schema';

@Schema()
export class TitleProperty implements TitlePropertyInterface {
  type: string;
  @Prop({ _id: false, type: [RichTextSchema] })
  title: RichTextInterface[];
}

export const TitlePropertySchema = SchemaFactory.createForClass(TitleProperty);
export type TitlePropertyDocument = TitleProperty & Document;
