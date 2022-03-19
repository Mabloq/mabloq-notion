import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PropertyTypeEnum } from './property-type.enum';
import { Document } from 'mongoose';
export type PropertyDocument = Property & Document;

@Schema({ discriminatorKey: 'type' })
export class Property {
  @Prop({
    type: String,
    required: true,
    enum: Object.values(PropertyTypeEnum),
    message: '{VALUE} is not supported',
  })
  type!: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
