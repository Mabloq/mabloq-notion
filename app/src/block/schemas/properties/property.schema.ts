import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PropertyTypeEnum } from './property-type.enum';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { randomIdGenerator } from 'src/block/utils/random-id-generator';
import { TitlePropertySchema } from './property-types/title-property.schema';
import { NumberPropertySchema } from './property-types/number-property.schema';
import { RichTextPropertySchema } from './property-types/rich-text-property.schema';

export type PropertyDocument = Property & Document;

@Schema({ _id: false, discriminatorKey: 'type' })
export class Property {
  @Prop({ default: () => randomIdGenerator(5) })
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
PropertySchema.discriminators = {
  title: TitlePropertySchema,
  [PropertyTypeEnum.NUMBER]: NumberPropertySchema,
  [PropertyTypeEnum.RICH_TEXT]: RichTextPropertySchema,
};
export { PropertySchema };
