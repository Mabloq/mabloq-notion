import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema({ _id: false })
export class RichText {
  @Prop({ required: true, default: 'text' })
  type: string;
  @Prop(
    raw({
      content: { type: String, required: true },
      link: { type: String, required: false },
    }),
  )
  text: Record<string, string>;
  @Prop(
    raw({
      type: {
        bold: { type: Boolean, default: false },
        italic: { type: Boolean, default: false },
        strikethrough: { type: Boolean, default: false },
        underline: { type: Boolean, default: false },
        code: { type: Boolean, default: false },
      },
      required: false,
    }),
  )
  annotation: Record<string, boolean>;
}

export const RichTextSchema = SchemaFactory.createForClass(RichText);
