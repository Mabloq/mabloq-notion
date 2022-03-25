import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Block, BlockSchema } from '../block.schema';
import { RichText, RichTextSchema } from '../common/rich-text.schema';
import { Image, ImageSchema } from '../common/image.schema';
import { PropertySchema, Property } from '../properties/ property.schema';

export enum ParentEnum {
  DATABASE_ID = 'database_id',
  PAGE_ID = 'page_id',
}

@Schema({ _id: false })
export class DatabaseParent {
  @Prop()
  database_id: string;
}
export const DatabaseParentSchema =
  SchemaFactory.createForClass(DatabaseParent);

@Schema({ _id: false })
export class PageParent {
  @Prop()
  database_id: string;
}
export const PageParentSchema = SchemaFactory.createForClass(PageParent);

@Schema({ _id: false, discriminatorKey: 'type' })
export class Parent {
  @Prop({ type: String, enum: Object.values(ParentEnum), required: true })
  type!: string;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
ParentSchema.path<MongooseSchema.Types.Subdocument>('type').discriminator(
  'database_id',
  DatabaseParentSchema,
);

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
  @Prop({ type: Map, of: PropertySchema })
  properties: Record<string, Property>;
  @Prop({ type: ParentSchema, required: false })
  parent: Parent;
}
export type PageBlockDocument = PageBlock & Document;
export const PageBlockSchema = SchemaFactory.createForClass(PageBlock);
