import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PropertyTypeEnum } from './property-type.enum';
import { Document } from 'mongoose';
import { randomIdGenerator } from 'src/block/utils/random-id-generator';
export type PropertyDocument = Property & Document;

@Schema({ _id: false, discriminatorKey: 'type' })
export class Property {
  @Prop({ default: () => randomIdGenerator(4) })
  id: string;
  @Prop({
    type: String,
    required: true,
    enum: Object.values(PropertyTypeEnum),
    message: '{VALUE} is not supported',
  })
  type!: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
