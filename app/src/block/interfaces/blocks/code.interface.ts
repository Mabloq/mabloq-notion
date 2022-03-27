import { BaseBlockInterface } from '../block.interface';
import { RichTextInterface } from '../common/rich-text.interface';

export interface CodeInterface {
  language: string;
  rich_text: RichTextInterface[];
}

export interface CodeBlockInterface extends BaseBlockInterface {
  code: CodeInterface;
}
