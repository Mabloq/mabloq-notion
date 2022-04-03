import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PropertyTypeEnum } from './property-type.enum';
import { Document, Schema as MongooseSchema } from 'mongoose';
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

const PropertySchema = SchemaFactory.createForClass(Property);

export { PropertySchema };
