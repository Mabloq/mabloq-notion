import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NumberProperty {
  @Prop({ _id: false, type: Number })
  number: number;
}

export const NumberPropertySchema =
  SchemaFactory.createForClass(NumberProperty);
export type NumberPropertyDocument = NumberProperty & Document;
