import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PropertySchema } from './properties/property.schema';
import { DatabaseInterface } from '../interfaces/database.interface';
import { FileObjectInterface } from '../interfaces/common/file-object.interface';
import { PropertyConfigInterface } from '../interfaces/properties/property.interface';
import { ParentInerface } from '../interfaces/common/parent.interface';
import { PropertyTypeEnum } from './properties/property-type.enum';
import { TitlePropertySchema } from './properties/property-types/title-property.schema';
import { NumberPropertySchema } from './properties/property-types/number-property.schema';
import { RichTextPropertySchema } from './properties/property-types/rich-text-property.schema';
import { SelectPropertySchema } from './properties/property-types/select-property.schema';
import { MultiSelectPropertySchema } from './properties/property-types/multi-select-property.schema';
import { SelectConfigSchema } from './properties/property-config/select-config-schema';
import { NumberConfigSchema } from './properties/property-config/number-config-schema';

@Schema({ _id: false })
export class Database implements DatabaseInterface {
  object!: string;
  archived: boolean;
  icon: FileObjectInterface;
  cover: FileObjectInterface;
  parent: ParentInerface;
  parent_id: string;
  created_time: string;
  created_by: string; //TODO: Partial<User>
  last_edited_time: string;
  last_edited_by: string; //TODO: Partial<User>
  @Prop({
    type: Map,
    of: PropertySchema,
    discriminators: [
      { name: PropertyTypeEnum.RICH_TEXT, schema: RichTextPropertySchema },
      { name: PropertyTypeEnum.SELECT, schema: SelectConfigSchema },
      { name: PropertyTypeEnum.NUMBER, schema: NumberConfigSchema },
      { name: PropertyTypeEnum.TITLE, schema: TitlePropertySchema },
    ],
  })
  properties: {
    title: PropertyConfigInterface;
    [key: string | symbol]: PropertyConfigInterface;
  };
}
export type DatabaseDocument = Database & Document;
export const DatabaseSchema = SchemaFactory.createForClass(Database);
