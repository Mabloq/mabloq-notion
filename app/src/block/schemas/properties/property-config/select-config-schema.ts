import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { randomIdGenerator } from 'src/block/utils/random-id-generator';

@Schema()
export class SelectOption {
  @Prop({ default: () => randomIdGenerator(4) })
  id: string;
  @Prop()
  color: string;
  @Prop()
  name: string;
}
export const SelectOptionSchema = SchemaFactory.createForClass(SelectOption);
export type SelectOptionDocument = SelectOption & Document;

@Schema()
export class SelectConfig {
  @Prop(
    raw({
      name: { type: String, required: true },
    }),
  )
  options: [SelectOption];
}
export const SelectConfigSchema = SchemaFactory.createForClass(SelectConfig);
export type SelectConfigDocument = SelectConfig & Document;
