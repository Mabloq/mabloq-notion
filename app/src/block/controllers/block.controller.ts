import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlockService } from '../services/block.service';
import { CreateBlockDto } from '../dto/create-block.dto';

@Controller('/api/rest/v1/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blockService.insertOne(createBlockDto);
  }

  @Get()
  findAll() {
    return this.blockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
  //   return this.blockService.update(+id, updateBlockDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockService.remove(+id);
  }
}
