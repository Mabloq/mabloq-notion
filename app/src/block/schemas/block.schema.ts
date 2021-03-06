import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { BaseBlockInterface } from '../interfaces/block.interface';
import { BlockEnum, BlockType } from './common/block-enum';
import { ObjectEnum } from './common/object-enum';
export type BlockDocument = Block & Document;

@Schema({
  discriminatorKey: 'type',
  timestamps: { createdAt: 'created_time', updatedAt: 'last_edited_time' },
})
export class Block implements BaseBlockInterface {
  @Prop({
    type: String,
    required: true,
    enum: Object.values(ObjectEnum),
    message: '{VALUE} is not supported',
  })
  object!: ObjectEnum.BLOCK;
  @Prop({
    type: String,
    required: true,
    enum: Object.values(BlockEnum),
    message: '{VALUE} is not supported',
  })
  type!: BlockType;

  @Prop()
  updated_by: string; //TODO: Partial<User>

  @Prop()
  has_children: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Block' }],
    required: false,
  })
  children: string[];

  @Prop({
    type: Date,
  })
  created_time: string;
  @Prop({
    type: Date,
  })
  last_edited_time: string;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
