import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SelectPropertyInterface } from 'src/block/interfaces/properties/property-types/select-property.interface';
import { Property } from '../property.schema';

@Schema()
export class SelectProperty implements SelectPropertyInterface {
  type: string;
  @Prop(
    raw({
      name: { type: String, required: true },
    }),
  )
  select: { name: string };
}

export const SelectPropertySchema =
  SchemaFactory.createForClass(SelectProperty);
export type SelectPropertyDocument = SelectProperty & Document;
