import { RichTextInterface } from '../../common/rich-text.interface';
import { BasePropertyInterface } from '../property.interface';

export interface RichTextPropertyInterface extends BasePropertyInterface {
  rich_text: RichTextInterface[];
}
