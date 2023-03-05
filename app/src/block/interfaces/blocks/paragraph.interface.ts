import { BaseBlockInterface, BlockInterface } from '../block.interface';
import { RichTextInterface } from '../common/rich-text.interface';

export interface ParagraphInterface {
  rich_text: RichTextInterface[];
  children?: BlockInterface[];
}
export interface ParagraphBlockInterface extends BaseBlockInterface {
  paragraph: ParagraphInterface;
}
