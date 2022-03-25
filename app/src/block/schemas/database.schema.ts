import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Block, BlockSchema } from './block.schema';
import { RichText, RichTextSchema } from './common/rich-text.schema';
import { Image, ImageSchema } from './common/image.schema';
import { PropertySchema, Property } from './properties/ property.schema';

@Schema({ _id: false })
export class Page {
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichText[];
  @Prop({ required: false })
  color: string;
  @Prop({ type: BlockSchema, required: false })
  children: Block[];
}
export type PageDocument = Page & Document;
export const PageSchema = SchemaFactory.createForClass(Page);

@Schema({ _id: false })
export class PageBlock {
  @Prop({ type: [RichText] })
  title: RichText[];
  @Prop({ type: Boolean, default: false })
  archived: boolean;
  @Prop({ type: ImageSchema, required: false })
  icon: Image;
  @Prop({ type: ImageSchema, required: false })
  cover: Image;
  @Prop({ type: Map, of: PropertySchema })
  properties: Record<string, Property>;
}
export type PageBlockDocument = PageBlock & Document;
export const PageBlockSchema = SchemaFactory.createForClass(PageBlock);
