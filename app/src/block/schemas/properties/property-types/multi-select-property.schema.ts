import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MultiSelectPropertyInterface } from 'src/block/interfaces/properties/property-types/multi-select-property.interface';

@Schema()
export class MultiSelectProperty implements MultiSelectPropertyInterface {
  type: string;
  @Prop(
    raw({
      name: { type: [{ name: String }], required: true },
    }),
  )
  multi_select: [{ name: string }];
}

export const MultiSelectPropertySchema =
  SchemaFactory.createForClass(MultiSelectProperty);
export type SelectPropertyDocument = MultiSelectProperty & Document;
