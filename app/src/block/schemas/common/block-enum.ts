export enum BlockEnum {
  PARAGRAPH = 'paragraph',
  HEADING1 = 'heading_1',
  IMAGE = 'image',
  CODE = 'code',
  FILE = 'file',
}

export type BlockType =
  | BlockEnum.PARAGRAPH
  | BlockEnum.HEADING1
  | BlockEnum.IMAGE
  | BlockEnum.FILE
  | BlockEnum.CODE;
