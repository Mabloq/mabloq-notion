import { BaseBlockInterface } from '../block.interface';
import { RichTextInterface } from '../common/rich-text.interface';

export interface Heading1Interface {
  color: string;
  rich_text: RichTextInterface[];
}

export interface Heading1BlockInterface extends BaseBlockInterface {
  heading_1: Heading1Interface;
}
