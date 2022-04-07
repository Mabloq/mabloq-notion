import { Injectable } from '@nestjs/common';
import { CreateDatabaseDto } from '../dto/database/create-database.dto';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HigherOrderBlock } from '../schemas/higher-order-block.schema';
import { DatabaseDocument } from '../schemas/database.schema';
@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(HigherOrderBlock.name)
    private higherOrderBlockModel: Model<HigherOrderBlock>,
  ) {}

  async insertOne(
    createDatabaseDto: CreateDatabaseDto,
  ): Promise<HigherOrderBlock> {
    const createdBlock = await this.higherOrderBlockModel.create(
      createDatabaseDto,
    );

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

  async findOne(id: string): Promise<Partial<DatabaseDocument>> {
    return (await this.higherOrderBlockModel.findById(
      id,
    )) as Partial<DatabaseDocument>;
  }
}
