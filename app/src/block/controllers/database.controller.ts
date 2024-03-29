import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDatabaseDto } from '../dto/database/create-database.dto';
import { DatabaseService } from '../services/database.service';

@Controller('/api/rest/v1/database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}
  @ApiTags('Database')
  @Post()
  create(@Body() createDatabaseDto: CreateDatabaseDto) {
    return this.databaseService.insertOne(createDatabaseDto);
  }

  @ApiTags('Database')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.databaseService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
  //   return this.blockService.update(+id, updateBlockDto);
  // }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.databaseService.remove(id);
  //   }
}
