import { CreateDatabaseDto } from 'src/block/dto/database/create-database.dto';
import { DatabaseInterface } from 'src/block/interfaces/database.interface';
import { ObjectEnum } from 'src/block/schemas/common/object-enum';
import { DatabaseDocument } from 'src/block/schemas/database.schema';
import { ParentInerface } from '../../../interfaces/common/parent.interface';
import { PropertiesConfigInterface } from '../../../interfaces/properties/property.interface';
import { HigherOrderBlockDocument } from '../../../schemas/higher-order-block.schema';

const dateIso = new Date().toISOString();
const mockBaseDatabase = (
  id = 'a uuid',
  object = ObjectEnum.DATABASE,
  last_edited_by = 'mabloq',
  created_by = 'mabloq',
): Omit<DatabaseInterface, 'properties'> => ({
  id,
  object,
  created_by,
  created_time: dateIso,
  last_edited_by,
  last_edited_time: dateIso,
});

export const mockDatabase = (
  id = 'a uuid',
  title = 'A Database Title',
  properties: PropertiesConfigInterface = {
    title: {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          plain_text: title,
          text: { text: title },
        },
      ],
    },
    valid_field: {
      type: 'number',
      format: 'number',
    },
  },
): DatabaseInterface => {
  const basePage = mockBaseDatabase(id);

  return {
    ...basePage,
    properties,
  };
};

export const mockDatabaseDto = (
  id = 'a uuid',
  title = 'A Page Title',
  properties: PropertiesConfigInterface = {
    title: {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          plain_text: title,
          text: { text: title },
        },
      ],
    },
    valid_field: {
      type: 'number',
      format: 'number',
    },
  },
  parent: ParentInerface = { type: 'page_id', page_id: 'id-page-1' },
): CreateDatabaseDto => {
  const basePage = mockBaseDatabase(id);

  return {
    ...basePage,
    properties,
    parent,
  };
};

export const mockDatabaseDocument = (
  mock?: Partial<DatabaseInterface>,
): Partial<DatabaseDocument> => ({
  _id: mock?.id || 'a uuid',
  object: mock?.object,
  icon: mock?.icon,
  cover: mock?.cover || { type: 'external', url: '' },
  archived: mock?.archived || false,
  last_edited_by: mock?.last_edited_by || 'mabloq',
  parent: mock?.parent || { type: 'workspace_id', workspace_id: 'workspace-1' },
  parent_id: mock?.parent_id || 'workspace-1',
  created_by: mock?.created_by || 'mabloq',
  created_time: mock?.created_time || dateIso,
  last_edited_time: mock?.last_edited_time || dateIso,
  properties: mock?.properties || {
    title: {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          plain_text: 'hello world',
          text: { text: 'hello world' },
        },
      ],
    },
    valid_field: {
      type: 'number',
      format: 'number',
    },
  },
});
