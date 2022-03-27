import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FileObjectSchema } from '../common/file-object.schema';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { ImageBlockInterface } from 'src/block/interfaces/blocks/image.interface';

export type ImageBlockDocument = ImageBlock & Document;

@Schema({ _id: false })
export class ImageBlock implements ImageBlockInterface {
  object: string;
  type: string;
  updated_by: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  @Prop({ type: FileObjectSchema, required: true })
  image: FileObjectInterface;
}

export const ImageBlockSchema = SchemaFactory.createForClass(ImageBlock);
