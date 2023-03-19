import { BlockDTOs } from 'src/block/dto/extra-models/block-models';
import { CreatePageDto } from 'src/block/dto/page/create-page.dto';
import { ParentInerface } from 'src/block/interfaces/common/parent.interface';
import { PageInterface } from 'src/block/interfaces/page.interface';
import { PropertiesInterface } from 'src/block/interfaces/properties/property.interface';
import { HigherOrderBlockDocument } from 'src/block/schemas/higher-order-block.schema';
import { PageDocument } from 'src/block/schemas/page.schema';
import { Types } from 'mongoose';
const dateIso = new Date().toISOString();
const mockBasePage = (
  id = 'a uuid',
  object = 'page',
  last_edited_by = 'mabloq',
  created_by = 'mabloq',
  has_content = false,
): Omit<PageInterface, 'properties'> => ({
  id,
  object,
  created_by,
  created_time: dateIso,
  last_edited_by,
  has_content,
  last_edited_time: dateIso,
});

export const mockPage = (
  id = 'a uuid',
  title = 'A Page Title',
  properties: PropertiesInterface = {
    title: {
      type: 'title',
      title: [
        {
          type: 'text',
          plain_text: title,
          text: { text: title },
        },
      ],
    },
  },
  content: Types.ObjectId[],
): PageInterface => {
  const basePage = mockBasePage(id);

  return {
    ...basePage,
    properties,
    content,
  };
};

export const mockCreatePageDto = (
  id = 'a uuid',
  title = 'A Page Title',
  properties: PropertiesInterface = {
    title: {
      type: 'title',
      title: [
        {
          type: 'text',
          plain_text: title,
          text: { text: title },
        },
      ],
    },
  },
  parent: ParentInerface = { type: 'page_id', page_id: 'id-page-1' },
  content: BlockDTOs[] = [],
): CreatePageDto => {
  const basePage = mockBasePage(id);

  return {
    ...basePage,
    properties,
    parent,
    content,
  };
};

export const mockPageDocument = (
  mock?: Partial<PageInterface>,
): Partial<HigherOrderBlockDocument | PageDocument> => ({
  _id: mock?.id || 'a uuid',
  object: mock?.object,
  last_edited_by: mock?.last_edited_by || 'mabloq',
  created_time: mock?.created_time || dateIso,
  last_edited_time: mock?.last_edited_time || dateIso,
  has_content: mock?.has_content || false,
  content: mock?.content || [new Types.ObjectId('block uuid')],
});
