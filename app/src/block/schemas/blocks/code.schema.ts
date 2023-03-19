import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RichTextSchema } from '../common/rich-text.schema';
import { CodeBlockInterface, CodeInterface } from 'src/block/interfaces';
import { RichTextInterface } from 'src/block/interfaces/common/rich-text.interface';
export type CodeDocument = Code & Document;
export type CodeBlockDocument = CodeBlock & Document;

@Schema({ _id: false })
export class Code implements CodeInterface {
  @Prop()
  language: string;
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichTextInterface[];
}
const CodeSchema = SchemaFactory.createForClass(Code);

@Schema({ _id: false })
export class CodeBlock implements CodeBlockInterface {
  object: string;
  type: string;
  updated_by: string;
  created_time: string;
  last_edited_time: string;
  @Prop({ type: CodeSchema, required: true })
  code: CodeInterface;
}

export const CodeBlockSchema = SchemaFactory.createForClass(CodeBlock);
