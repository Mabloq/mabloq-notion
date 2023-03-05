import { Injectable, Post } from '@nestjs/common';
import {
  CreateCodeBlockDto,
  CreateHeading1BlockDto,
  CreateImageBlockDto,
  CreateParagraphBlockDto,
} from '../dto/create-block.dto';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Block, BlockDocument } from '../schemas/block.schema';
import {
  ParagraphBlock,
  ParagraphBlockDocument,
} from '../schemas/blocks/paragraph.schema';

@Injectable()
export class BlockService {
  constructor(@InjectModel(Block.name) private blockModel: Model<Block>) {}

  async insertOne(
    createBlockDto:
      | CreateCodeBlockDto
      | CreateParagraphBlockDto
      | CreateHeading1BlockDto
      | CreateImageBlockDto,
  ): Promise<Block> {
    if (createBlockDto.children.length) {
      const childrenBlocks = await this.blockModel.create(
        createBlockDto.children,
      );
      const childrenBlocksIds = childrenBlocks.map((b) => b._id);

      const cblock = {
        ...createBlockDto,
        children: childrenBlocksIds,
      };
      const createdBlock = await this.blockModel.create(cblock);
      return createdBlock;
    } else {
      const createdBlock = await this.blockModel.create(createBlockDto);
      return createdBlock.save();
    }
  }

  async findMany(blockIds: string[]) {
    const findQuery: FilterQuery<Block> = {
      _id: {
        $in: blockIds,
      },
    };
    const fetchedBlocks = await this.blockModel.find(findQuery).exec();
    return fetchedBlocks;
  }

  async findOne(id: string) {
    return await this.blockModel.findById(id);
  }

  async findAll() {
    return await this.blockModel.find({}).limit(10);
  }
  update(id: number) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}
