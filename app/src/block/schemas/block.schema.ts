import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { BlockEnum } from './common/block-enum';
import { ObjectEnum } from './common/object-enum';
export type BlockDocument = Block & Document;

@Schema({
  discriminatorKey: 'type',
  timestamps: { createdAt: 'created_time', updatedAt: 'last_edited_time' },
})
export class Block {
  @Prop({
    type: String,
    required: true,
    enum: Object.values(ObjectEnum),
    message: '{VALUE} is not supported',
    index: true,
  })
  object!: string;
  @Prop({
    type: String,
    required: true,
    enum: Object.values(BlockEnum),
    message: '{VALUE} is not supported',
  })
  type!: string;
  @Prop()
  updated_by: string; //TODO: Partial<User>

  @Prop()
  has_children: boolean;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
