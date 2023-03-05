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
import { DatabaseSchema } from './schemas/database.schema';
import { PageSchema } from './schemas/page.schema';
import {
  HigherOrderBlock,
  HigherOrderBlockSchema,
} from './schemas/higher-order-block.schema';
import { ObjectEnum } from './schemas/common/object-enum';
import { DatabaseService } from './services/database.service';
import { DatabaseController } from './controllers/database.controller';
import { PageService } from './services/page.service';
import { WorkspaceSchema } from './schemas/workspace.schema';

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
    MongooseModule.forFeature([
      {
        name: HigherOrderBlock.name,
        schema: HigherOrderBlockSchema,
        discriminators: [
          { name: ObjectEnum.PAGE, schema: PageSchema },
          { name: ObjectEnum.DATABASE, schema: DatabaseSchema },
          { name: ObjectEnum.WORKSPACE, schema: WorkspaceSchema },
        ],
      },
    ]),
  ],
  providers: [BlockService, DatabaseService, PageService],
  controllers: [BlockController, DatabaseController],
})
export class BlockModule {}
