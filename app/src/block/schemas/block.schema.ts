import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseBlockInterface } from '../interfaces/block.interface';
import { CodeBlockSchema } from './blocks/code.schema';
import { Heading1BlockSchema } from './blocks/heading-1.schema';
import { ImageBlockSchema } from './blocks/image.schema';
import { ParagraphBlockSchema } from './blocks/paragraph.schema';
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
    default: ObjectEnum.BLOCK,
    enum: [ObjectEnum.BLOCK],
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

// BlockSchema.path<MongooseSchema.Types.Subdocument>('code').discriminator(
//   'code',
//   CodeBlockSchema,
// );

BlockSchema.discriminators = {
  code: CodeBlockSchema,
  paragraph: ParagraphBlockSchema,
  heading_1: Heading1BlockSchema,
  image: ImageBlockSchema,
};
