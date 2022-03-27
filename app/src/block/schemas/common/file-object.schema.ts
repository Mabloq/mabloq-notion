import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';

@Schema({ _id: false })
export class FileObject implements FileObjectInterface {
  @Prop({ default: 'external' })
  type: string;
  @Prop({ required: true })
  url: string;
}
export const FileObjectSchema = SchemaFactory.createForClass(FileObject);
