import { RichTextInterface } from '../../common/rich-text.interface';
import { BasePropertyInterface } from '../property.interface';

export interface TitleProperty extends BasePropertyInterface {
  title: RichTextInterface[];
}
