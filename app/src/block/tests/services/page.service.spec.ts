import { Test, TestingModule } from '@nestjs/testing';
import { PageService } from '../../services/page.service';
import { getModelToken } from '@nestjs/mongoose';
import { Query, Model } from 'mongoose';
import { Block, BlockDocument } from '../../schemas/block.schema';
import { CreateBlockDto } from '../../dto/create-block.dto';

import { BlockDTOs } from '../../dto/extra-models/block-models';
import { mockPage, mockPageDocument, mockCreatePageDto } from '../mocks/page';
import {
  HigherOrderBlockDocument,
  HigherOrderBlock,
} from '../../schemas/higher-order-block.schema';
import { DatabaseService } from '../../services/database.service';
import { mockDatabase, mockDatabaseDocument } from '../mocks/database';

describe('PageService', () => {
  let pageService: PageService;
  let databaseService: DatabaseService;
  let higherOrderBlockModel: Model<HigherOrderBlock>;
  let blockModel: Model<Block>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PageService,
        DatabaseService,
        {
          provide: getModelToken('HigherOrderBlock'),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken('Block'),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),

            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    pageService = module.get<PageService>(PageService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    higherOrderBlockModel = module.get<Model<HigherOrderBlock>>(
      getModelToken('HigherOrderBlock'),
    );
    blockModel = module.get<Model<Block>>(getModelToken('Block'));
  });

  it('should be defined', () => {
    expect(pageService).toBeDefined();
  });
  describe('insertOne', () => {
    it('throws error if parent is not database, and user tries to create page with properites other than title property', async () => {
      const pageDto = mockCreatePageDto('id-hello', 'Hello World', {
        title: {
          type: 'title',
          title: [
            {
              type: 'text',
              plain_text: 'Hello World',
              text: { text: 'Hello World' },
            },
          ],
        },
        invalid_field: {
          type: 'number',
          number: 5,
        },
      });
      await expect(async () => {
        await pageService.insertOne(pageDto);
      }).rejects.toThrow(
        'Invalid Field Exception: Pages with parents of type page can only use title property',
      );
    });

    it('throws error if not given valid properties of parent database', async () => {
      const databaseInterface = mockDatabase();
      jest
        .spyOn(databaseService, 'findOne')
        .mockImplementation(async () =>
          mockDatabaseDocument(databaseInterface),
        );

      const pageDto = mockCreatePageDto(
        'id-hello',
        'Hello World',
        {
          title: {
            type: 'title',
            title: [
              {
                type: 'text',
                plain_text: 'Hello World',
                text: { text: 'Hello World' },
              },
            ],
          },
          invalid_field: {
            type: 'number',
            number: 5,
          },
        },
        { database_id: 'database-id', type: 'database' },
      );
      await expect(async () => {
        await pageService.insertOne(pageDto);
      }).rejects.toThrow(
        'Invalid Field exception: {invalid_field} not valid field(s) on database: {title, valid_field}',
      );
    });

    // it('If failes creating block children, if something goes wrong throw exception', async () => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
