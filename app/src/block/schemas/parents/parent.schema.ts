import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum ParentEnum {
  DATABASE_ID = 'database_id',
  PAGE_ID = 'page_id',
}

@Schema({ _id: false, discriminatorKey: 'type' })
export class Parent {
  @Prop({ type: String, enum: Object.values(ParentEnum), required: true })
  type!: string;
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
