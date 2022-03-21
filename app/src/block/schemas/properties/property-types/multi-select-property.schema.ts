import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MultiSelectProperty {
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
