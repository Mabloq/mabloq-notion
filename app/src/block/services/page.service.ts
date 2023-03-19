import { Injectable } from '@nestjs/common';
import { CreateDatabaseDto } from '../dto/database/create-database.dto';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HigherOrderBlock } from '../schemas/higher-order-block.schema';
import { CreatePageDto } from '../dto/page/create-page.dto';
import { Block } from '../schemas/block.schema';
import { DatabaseDocument } from '../schemas/database.schema';
import {
  isDatabaseParent,
  isPageParent,
} from '../utils/type-guards/parent-types';

import { DatabaseService } from './database.service';
import PageParentValidator from '../utils/page-validators/validators/page-parent-validator';
import DatabaseParentValidator from '../utils/page-validators/validators/database-parent-validator';
import { Page } from '../schemas/page.schema';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(HigherOrderBlock.name)
    private pageModel: Model<HigherOrderBlock>,
    @InjectModel(Block.name)
    private blockModel: Model<Block>,
    private dataBaseService: DatabaseService,
  ) {}

  async insertOne(createPageDto: CreatePageDto): Promise<HigherOrderBlock> {
    if (isPageParent(createPageDto.parent)) {
      const validator = new PageParentValidator(createPageDto);
      await validator.validate();
    } else if (isDatabaseParent(createPageDto.parent)) {
      const parentId = createPageDto.parent.database_id;
      const database = await this.dataBaseService.findOne(parentId);
      const dbParentValidator = new DatabaseParentValidator(createPageDto);
      await dbParentValidator.validate(database.properties);
    }

    if (createPageDto.content.length) {
      const childrenBlocks = await this.blockModel.create(
        createPageDto.content,
      );
      const childrenBlocksIds = childrenBlocks.map((b) => b._id);

      const cblock = {
        ...createPageDto,
        content: childrenBlocksIds,
      };
      const createdBlock = await this.pageModel.create(cblock);
      return createdBlock.save();
    }

    //check if CreatePageDto has blocks children
    //If has block children, create all of othem and map results to array of ObjectIds and add them to Page
    const createdBlock = await this.pageModel.create(createPageDto);

    return createdBlock.save();
  }

  async findAll() {
    const findQuery: FilterQuery<Page> = {
      object: 'page',
    };
    return await this.pageModel.find(findQuery).limit(10);
  }

  async findChildren(parentId: string) {
    const findQuery: FilterQuery<Page> = {
      parent_id: parentId,
    };
    const fetchedBlocks = await this.pageModel.find(findQuery).exec();
    return fetchedBlocks;
  }

  async findOne(id: string) {
    return await this.pageModel.findById(id);
  }

  //   async findDatabasePages()
}
