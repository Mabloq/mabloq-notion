import { Module } from '@nestjs/common';
import { BlockService } from './services/block.service';
import { BlockController } from './controllers/block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './schemas/block.schema';
import { BlockEnum } from './schemas/common/block-enum';
import { ParagraphBlockSchema } from './schemas/blocks/paragraph.schema';
import { Heading1BlockSchema } from './schemas/blocks/heading-1.schema';
import { ImageBlockSchema } from './schemas/common/image.schema';
import { CodeBlockSchema } from './schemas/blocks/code.schema';
import {
  DatabaseParentSchema,
  PageParentSchema,
  Parent,
  ParentEnum,
  ParentSchema,
} from './schemas/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Block.name,
        schema: BlockSchema,
        discriminators: [
          { name: BlockEnum.PARAGRAPH, schema: ParagraphBlockSchema },
          { name: BlockEnum.HEADING1, schema: Heading1BlockSchema },
          { name: BlockEnum.IMAGE, schema: ImageBlockSchema },
          { name: BlockEnum.CODE, schema: CodeBlockSchema },
        ],
      },
    ]),
  ],
  providers: [BlockService],
  controllers: [BlockController],
})
export class BlockModule {}
