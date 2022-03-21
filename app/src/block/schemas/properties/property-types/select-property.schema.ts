import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SelectProperty {
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
