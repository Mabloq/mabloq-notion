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
import { CreatePageDto } from '../dto/page/create-page.dto';
import { PageService } from '../services/page.service';

@Controller('/api/rest/v1/page')
export class PageController {
  constructor(private readonly pageService: PageService) {}
  @ApiTags('Page')
  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    console.log(createPageDto);
    return this.pageService.insertOne(createPageDto);
  }

  @ApiTags('Page')
  @Get()
  findAll() {
    return this.pageService.findAll();
  }

  @ApiTags('Page')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(id);
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
