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
import {
  PropertiesConfigInterface,
  PropertiesInterface,
  PropertyConfigInterface,
} from '../interfaces/properties/property.interface';
import { DatabaseService } from './database.service';
import PageParentValidator from '../utils/page-validators/validators/page-parent-validator';
import DatabaseParentValidator from '../utils/page-validators/validators/database-parent-validator';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(HigherOrderBlock.name)
    private higherOrderBlockModel: Model<HigherOrderBlock>,
    private dataBaseService: DatabaseService,
  ) {}

  private onlyTitleProperties(properties: PropertiesInterface) {
    const fieldValues = Object.keys(properties);
    return fieldValues.length == 1 && fieldValues[0] == 'title';
  }

  private onlyDatabaseProperties(
    pageProperites: PropertiesInterface,
    DatabaseProperties: PropertiesConfigInterface,
  ) {
    const pagePropertyeKeys = Object.keys(pageProperites);
    const databasePropertyKeys = Object.keys(DatabaseProperties);

    return pagePropertyeKeys.every((key) => databasePropertyKeys.includes(key));
  }

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

    //check if CreatePageDto has blocks children
    //If has block children, create all of othem and map results to array of ObjectIds and add them to Page
    const createdBlock = await this.higherOrderBlockModel.create(createPageDto);

    return createdBlock.save();
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
