import { ParagraphBlockInterface } from './blocks/paragraph.interface';
import { Heading1Interface } from './blocks/heading1.interface';
import { CodeBlockInterface } from './blocks/code.interface';

export interface BaseBlockInterface {
  id?: string;
  object: string;
  type: string;
  created_time: string;
  last_edited_time: string;
  updated_by: string;
  has_children: boolean;
  children?: BlockInterface[];
}

export type BlockInterface =
  | ParagraphBlockInterface
  | Heading1Interface
  | CodeBlockInterface;
