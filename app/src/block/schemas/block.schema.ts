import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { BlockEnum } from './common/block-enum';
export type BlockDocument = Block & Document;

@Schema({ discriminatorKey: 'type' })
export class Block {
  @Prop()
  object: string;
  @Prop({
    type: String,
    required: true,
    enum: Object.values(BlockEnum),
    message: '{VALUE} is not supported',
  })
  type!: string;
  @Prop()
  created_time: string;
  @Prop()
  updated_by: string; //TODO: Partial<User>
  @Prop()
  last_edited_time: string;
  @Prop()
  has_children: boolean;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
