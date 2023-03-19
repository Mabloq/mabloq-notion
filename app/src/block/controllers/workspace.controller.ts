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
import { CreateWorkspaceDto } from '../dto/workspace/create-workspace.dto';
import { WorkspaceService } from '../services/workspace.service';

@Controller('/api/rest/v1/workspace')
export class WorkspaceController {
  constructor(private readonly workSpaceService: WorkspaceService) {}
  @ApiTags('Workspace')
  @Post()
  create(@Body() createWorkSpaceDto: CreateWorkspaceDto) {
    return this.workSpaceService.insertOne(createWorkSpaceDto);
  }

  @ApiTags('Workspace')
  @Get()
  findAll() {
    return this.workSpaceService.findAll();
  }

  @ApiTags('Workspace')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workSpaceService.findOne(id);
  }

  @ApiTags('Workspace')
  @Get(':id/children')
  findChildren(@Param('id') id: string) {
    return this.workSpaceService.findChildren(id);
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
