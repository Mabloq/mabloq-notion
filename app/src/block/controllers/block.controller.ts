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
import {
  CreateBlockDto,
  CreateHeading1BlockDto,
  CreateImageBlockDto,
  CreateParagraphBlockDto,
  CreateCodeBlockDto,
} from '../dto/create-block.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
@ApiExtraModels(
  CreateCodeBlockDto,
  CreateHeading1BlockDto,
  CreateParagraphBlockDto,
  CreateImageBlockDto,
)
@Controller('/api/rest/v1/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(CreateParagraphBlockDto) },
        { $ref: getSchemaPath(CreateCodeBlockDto) },
        { $ref: getSchemaPath(CreateHeading1BlockDto) },
        { $ref: getSchemaPath(CreateImageBlockDto) },
      ],
    },
  })
  @ApiTags('Block')
  @Post()
  create(
    @Body()
    createBlockDto:
      | CreateCodeBlockDto
      | CreateHeading1BlockDto
      | CreateImageBlockDto
      | CreateParagraphBlockDto,
  ) {
    return this.blockService.insertOne(createBlockDto);
  }

  @ApiTags('Block')
  @Get()
  findAll() {
    return this.blockService.findAll();
  }

  @ApiTags('Block')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
  //   return this.blockService.update(+id, updateBlockDto);
  // }

  @ApiTags('Block')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockService.remove(+id);
  }
}
