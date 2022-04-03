import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Block, BlockSchema } from './block.schema';
import { RichText, RichTextSchema } from './common/rich-text.schema';
import { Image, ImageSchema } from './common/image.schema';
import { PropertySchema, Property } from './properties/property.schema';
import { PageInterface } from '../interfaces/page.interface';
import { FileObjectInterface } from '../interfaces/common/file-object.interface';
import { PropertyInterface } from '../interfaces/properties/property.interface';
import { ParentInerface } from '../interfaces/common/parent.interface';
import { ObjectEnum } from './common/object-enum';
import mongoose from 'mongoose';

@Schema()
export class Page implements PageInterface {
  object!: string;
  archived: boolean;
  icon: FileObjectInterface;
  cover: FileObjectInterface;
  properties: {
    title: PropertyInterface;
    [key: string | symbol]: PropertyInterface;
  };
  parent: ParentInerface;
  parent_id: string;
  created_time: string;
  created_by: string; //TODO: Partial<User>
  last_edited_time: string;
  last_edited_by: string; //TODO: Partial<User>
  @Prop({ type: Boolean, default: false })
  has_content: boolean;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Block' })
  content: string[];
}
export type PageDocument = Page & Document;
export const PageSchema = SchemaFactory.createForClass(Page);
