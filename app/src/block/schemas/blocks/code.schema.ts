import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RichText, RichTextSchema } from '../common/rich-text.schema';

export type CodeDocument = Code & Document;
export type CodeBlockDocument = CodeBlock & Document;

@Schema({ _id: false })
export class Code {
  @Prop()
  language: string;
  @Prop({ _id: false, type: [RichTextSchema] })
  rich_text: RichText[];
}
const CodeSchema = SchemaFactory.createForClass(Code);

@Schema({ _id: false })
export class CodeBlock {
  @Prop({ type: CodeSchema, required: true })
  code: Code;
}

export const CodeBlockSchema = SchemaFactory.createForClass(CodeBlock);
