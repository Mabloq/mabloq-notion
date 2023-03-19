import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NumberPropertyInterface } from 'src/block/interfaces/properties/property-types/number-property.interface';
import { Property } from '../property.schema';

@Schema()
export class NumberProperty implements NumberPropertyInterface {
  type: string;
  @Prop({ _id: false, type: Number })
  number: number;
}

export const NumberPropertySchema =
  SchemaFactory.createForClass(NumberProperty);
export type NumberPropertyDocument = NumberProperty & Document;
