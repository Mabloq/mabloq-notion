import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Block, BlockSchema } from '../block.schema';
import { RichText, RichTextSchema } from '../common/rich-text.schema';
export type ParagraphDocument = Paragraph & Document;
export type ParagraphBlockDocument = ParagraphBlock & Document;

@Schema({ _id: false })
export class Paragraph {
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichText[];
  @Prop({ required: false })
  color: string;
  @Prop({ type: BlockSchema, required: false })
  children: Block[];
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);

@Schema({ _id: false })
export class ParagraphBlock {
  @Prop({ type: ParagraphSchema, required: true })
  paragraph: Paragraph;
}

export const ParagraphBlockSchema =
  SchemaFactory.createForClass(ParagraphBlock);
