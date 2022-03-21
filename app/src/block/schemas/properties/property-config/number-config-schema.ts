import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum FormatEnum {
  NUMBER = 'number',
  DOLLAR = 'dollar',
  NUMBER_WITH_COMMAS = 'number_with_commas',
  PERCENT = 'percent',
}

@Schema()
export class NumberConfig {
  @Prop({
    type: String,
    enum: Object.values(FormatEnum),
    required: true,
    message: '{VALUE} is not supported',
  })
  format: string;
}
export const NumberConfigSchema = SchemaFactory.createForClass(NumberConfig);
export type NumberConfigDocument = NumberConfig & Document;
