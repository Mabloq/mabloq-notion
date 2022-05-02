import {
  BaseBlockInterface,
  BlockInterface,
  ParagraphBlockInterface,
  CodeBlockInterface,
  Heading1BlockInterface,
} from 'src/block/interfaces';
import { BlockDTOs } from 'src/block/dto/extra-models/block-models';
import { BlockDocument } from 'src/block/schemas/block.schema';
import { ParagraphBlockDocument } from 'src/block/schemas/blocks/paragraph.schema';
import { CodeBlockDocument } from 'src/block/schemas/blocks/code.schema';
import { BlockEnum } from 'src/block/schemas/common/block-enum';
import { ObjectEnum } from 'src/block/schemas/common/object-enum';

const dateIso = new Date().toISOString();

type BlockTypeInterface =
  | ParagraphBlockInterface
  | CodeBlockInterface
  | Heading1BlockInterface;
type DiscriminatorInterface =
  | Pick<ParagraphBlockInterface, 'paragraph'>
  | Pick<CodeBlockInterface, 'code'>;

type TypeEnum = 'paragraph' | 'code' | 'heading_1';

const mockBlock = (
  id = 'a uuid',
  object = 'block',
  type = 'paragraph',
  created_time = dateIso,
  last_edited_time = dateIso,
  updated_by = 'mabloq',
  has_children = false,
): BaseBlockInterface => ({
  id,
  object,
  type,
  updated_by,
  has_children,
  created_time,
  last_edited_time,
});

export const mockParagraphBlock = (
  id = 'a uuid',
  paragraphText = 'Hello There!',
  object = 'block',
  type: TypeEnum = 'paragraph',
  created_time = dateIso,
  last_edited_time = dateIso,
  updated_by = 'mabloq',
  has_children = false,
): ParagraphBlockInterface => {
  const baseBlock = mockBlock(
    id,
    object,
    type,
    created_time,
    last_edited_time,
    updated_by,
    has_children,
  );

  return {
    ...baseBlock,
    paragraph: {
      rich_text: [
        {
          plain_text: paragraphText,
          type: 'text',
          text: { text: paragraphText },
        },
      ],
    },
  };
};

export const mockCodeBlock = (
  id = 'a uuid',
  codeText = 'console.log("Hello World!")',
  created_time = dateIso,
  last_edited_time = dateIso,
  updated_by = 'mabloq',
  has_children = false,
): CodeBlockInterface => {
  const baseBlock = mockBlock(
    id,
    'block',
    'code',
    created_time,
    last_edited_time,
    updated_by,
    has_children,
  );

  return {
    ...baseBlock,
    code: {
      rich_text: [
        { plain_text: codeText, type: 'text', text: { text: codeText } },
      ],
      language: 'javascript',
    },
  };
};

export const mockParagraphBlockDocument = (
  mock?: Partial<ParagraphBlockInterface>,
): Partial<BlockDocument | ParagraphBlockDocument> => ({
  _id: mock?.id || 'a uuid',
  object: mock?.object,
  type: mock?.type || 'type',
  updated_by: mock?.updated_by || 'mabloq',
  created_time: mock?.created_time || dateIso,
  last_edited_time: mock?.last_edited_time || dateIso,
  has_children: mock?.has_children || false,
  paragraph: mock.paragraph,
});

export const mockCodeBlockDocument = (
  mock?: Partial<CodeBlockInterface>,
): Partial<BlockDocument | CodeBlockDocument> => ({
  _id: mock?.id || 'a uuid',
  object: mock?.object,
  type: mock?.type || 'type',
  updated_by: mock?.updated_by || 'mabloq',
  created_time: mock?.created_time || dateIso,
  last_edited_time: mock?.last_edited_time || dateIso,
  has_children: mock?.has_children || false,
  code: mock.code,
});

export const mapParagraphBlockArrToDocumentArr = (
  blocks: ParagraphBlockInterface[],
) => blocks.map((block) => mockParagraphBlockDocument(block));

export const mapCodeBlockArrToDocumentArr = (blocks: CodeBlockInterface[]) =>
  blocks.map((block) => mockCodeBlockDocument(block));
