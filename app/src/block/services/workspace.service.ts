import { Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HigherOrderBlock } from '../schemas/higher-order-block.schema';
import { CreateWorkspaceDto } from '../dto/workspace/create-workspace.dto';
import { Block } from '../schemas/block.schema';
import {
  isDatabaseParent,
  isPageParent,
} from '../utils/type-guards/parent-types';

import PageParentValidator from '../utils/page-validators/validators/page-parent-validator';
import DatabaseParentValidator from '../utils/page-validators/validators/database-parent-validator';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(HigherOrderBlock.name)
    private higherOrderBlockModel: Model<HigherOrderBlock>,
  ) {}

  async insertOne(
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<HigherOrderBlock> {
    //check if CreatePageDto has blocks children
    //If has block children, create all of othem and map results to array of ObjectIds and add them to Page
    const createdBlock = await this.higherOrderBlockModel.create({
      object: 'workspace',
      cover: createWorkspaceDto.cover,
      icon: createWorkspaceDto.icon,
      created_by: 'mabloq',
      created_time: Date.now(),
      last_edited_by: 'mabloq',
      last_edited_time: Date.now(),
      properities: createWorkspaceDto.properties,
    });

    return createdBlock.save();
  }

  async findAll() {
    const findQuery: FilterQuery<HigherOrderBlock> = {
      object: 'workspace',
    };
    return await this.higherOrderBlockModel.find(findQuery).limit(10);
  }

  async findChildren(parentId: string) {
    const findQuery: FilterQuery<HigherOrderBlock> = {
      parent_id: parentId,
    };
    const fetchedBlocks = await this.higherOrderBlockModel
      .find(findQuery)
      .exec();
    return fetchedBlocks;
  }

  async findOne(id: string) {
    return await this.higherOrderBlockModel.findById(id);
  }

  //   async findDatabasePages()
}
