import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FileObjectSchema } from '../common/file-object.schema';
import { FileObjectInterface } from 'src/block/interfaces/common/file-object.interface';
import { FileBlockInterface } from 'src/block/interfaces/blocks/file.interface';

export type FileBlockDocument = FileBlock & Document;

@Schema({ _id: false })
export class FileBlock implements FileBlockInterface {
  object: string;
  type: string;
  updated_by: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  @Prop({ type: FileObjectSchema, required: true })
  file: FileObjectInterface;
}

export const FileBlockSchema = SchemaFactory.createForClass(FileBlock);
