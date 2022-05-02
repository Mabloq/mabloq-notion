import { Test, TestingModule } from '@nestjs/testing';
import { BlockService } from '../../services/block.service';
import { getModelToken } from '@nestjs/mongoose';
import { Query, Model } from 'mongoose';
import { BlockInterface } from '../../interfaces/block.interface';
import { BlockDocument } from '../../schemas/block.schema';
import { CreateBlockDto } from '../../dto/create-block.dto';
import { json } from 'stream/consumers';
import { BlockDTOs } from '../../dto/extra-models/block-models';
import {
  mockParagraphBlock,
  mockParagraphBlockDocument,
  mapParagraphBlockArrToDocumentArr,
} from '../mocks/blocks';

const blockArr = [
  mockParagraphBlock('id-1', 'One Block to rule them all'),
  mockParagraphBlock('id-2', 'One Block to find them'),
  mockParagraphBlock('id-3', 'One Block to bring them all'),
  mockParagraphBlock('id-4', 'One Block to bring them all'),
  mockParagraphBlock('id-5', 'And in the neatness bind them.'),
];

const blockDocumentArr = mapParagraphBlockArrToDocumentArr(blockArr);

describe('BlockService', () => {
  let service: BlockService;
  let model: Model<BlockDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockService,
        {
          provide: getModelToken('Block'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockParagraphBlock()),
            constructor: jest.fn().mockResolvedValue(mockParagraphBlock()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BlockService>(BlockService);
    model = module.get<Model<BlockDocument>>(getModelToken('Block'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findMany: should return all listed block ids', async () => {
    //Spy mock!
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(blockDocumentArr),
    } as any);

    //set scenario usig service, that uses model.find method
    const foundBlocks = await service.findMany([
      'id-1',
      'id-2',
      'id-3',
      'id-4',
      'id-5',
    ]);

    //assert that out our service actually calls our model.find method
    expect(foundBlocks).toEqual(blockDocumentArr);
  });

  it('insertOne: returns created block', async () => {
    // spyc mock makes sure that if create gets called in our service.insertOne function we return a mock created block
    jest.spyOn(model, 'create').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockParagraphBlockDocument()),
    } as any);

    //set scenario using the service.insertOne method
    const createdBlock = await service.insertOne({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              text: 'derp',
            },
          },
        ],
      },
    });
  });
});
