import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Block, BlockDocument } from './schemas/block.schema';
import {
  ParagraphBlock,
  ParagraphBlockDocument,
} from './schemas/blocks/paragraph.schema';
@Injectable()
export class BlockService {
  constructor(@InjectModel(Block.name) private blockModel: Model<Block>) {}

  create(createBlockDto: CreateBlockDto): Promise<Block> {
    const createdBlock = new this.blockModel(createBlockDto);
    console.log(createBlockDto);

    console.log(createdBlock.toJSON());
    return createdBlock.save();
  }

  findAll() {
    return `This action returns all block`;
  }

  findOne(id: number) {
    return `This action returns a #${id} block`;
  }

  update(id: number, updateBlockDto: UpdateBlockDto) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}
