import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ImageDocument = Image & Document;
export type ImageBlockDocument = ImageBlock & Document;

@Schema({ _id: false })
export class Image {
  @Prop()
  type: 'external';
  @Prop(raw({ url: { type: String, required: true } }))
  external: { url: string };
}
export const ImageSchema = SchemaFactory.createForClass(Image);

@Schema({ _id: false })
export class ImageBlock {
  @Prop({ type: ImageSchema, required: true })
  image: Image;
}

export const ImageBlockSchema = SchemaFactory.createForClass(ImageBlock);
