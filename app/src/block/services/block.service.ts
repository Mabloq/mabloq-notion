import { Injectable, Post } from '@nestjs/common';
import {
  CreateHeading1BlockDto,
  CreateImageBlockDto,
  CreateParagraphBlockDto,
  CreateCodeBlockDto,
} from '../dto/create-block.dto';
import { Model, FilterQuery, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Block, BlockDocument } from '../schemas/block.schema';
import {
  ParagraphBlock,
  ParagraphBlockDocument,
} from '../schemas/blocks/paragraph.schema';
import { HigherOrderBlock } from '../schemas/higher-order-block.schema';
import { Page } from '../schemas/page.schema';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private blockModel: Model<Block>,
    @InjectModel(HigherOrderBlock.name)
    private higherOrderBlockModel: Model<Page>,
  ) {}

  async insertOne(
    createBlockDto:
      | CreateCodeBlockDto
      | CreateParagraphBlockDto
      | CreateHeading1BlockDto
      | CreateImageBlockDto,
  ): Promise<Block> {
    const createdBlock = await this.blockModel.create(createBlockDto);
    return createdBlock.save();
  }

  async insertOneAtIndex(
    createBlockDto:
      | CreateCodeBlockDto
      | CreateParagraphBlockDto
      | CreateHeading1BlockDto
      | CreateImageBlockDto,
    index: string,
  ): Promise<Block> {
    const createdBlock = await this.blockModel.create(createBlockDto);
    const savedBlock = await createdBlock.save();
    console.log('Sasved Block Id', savedBlock._id);
    const parsedIndex = parseInt(index);
    const foundPage = await this.higherOrderBlockModel.findOne({
      _id: new Types.ObjectId(createBlockDto.parent.page_id),
    });
    console.log('Found Page', foundPage);

    foundPage.content.splice(parsedIndex, 0, savedBlock._id);
    console.log('Found Page After', foundPage);
    console.log(foundPage.content);
    const page = await this.higherOrderBlockModel.findOneAndUpdate(
      {
        _id: createBlockDto.parent.page_id,
      },
      {
        $push: {
          content: {
            $position: parsedIndex,
            $each: [new Types.ObjectId(savedBlock._id)],
          },
        },
      },
      { new: true, strict: false },
    );
    console.log(page);
    return savedBlock;
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
