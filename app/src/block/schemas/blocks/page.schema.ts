import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Block, BlockSchema } from '../block.schema';
import { RichText, RichTextSchema } from '../common/rich-text.schema';
import { Image, ImageSchema } from '../common/image.schema';

export type PageDocument = Page & Document;
export type PageBlockDocument = PageBlock & Document;

@Schema({ _id: false })
export class Page {
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichText[];
  @Prop({ required: false })
  color: string;
  @Prop({ type: BlockSchema, required: false })
  children: Block[];
}

export const PageSchema = SchemaFactory.createForClass(Page);

@Schema({ _id: false })
export class PageBlock {
  @Prop({ type: Boolean, default: false })
  archived: boolean;
  @Prop({ type: ImageSchema, required: false })
  icon: Image;
  @Prop({ type: ImageSchema, required: false })
  cover: Image;
  @Prop()
  properties: Record<string, any>;
}

export const PageBlockSchema = SchemaFactory.createForClass(PageBlock);
