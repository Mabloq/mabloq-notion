import { Test, TestingModule } from '@nestjs/testing';
import { BlockController } from '../../controllers/block.controller';
import { BlockService } from '../../services/block.service';

describe('BlockController', () => {
  let controller: BlockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockController],
      providers: [BlockService],
    }).compile();

    controller = module.get<BlockController>(BlockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
