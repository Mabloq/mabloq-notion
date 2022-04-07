import { RichTextInterface } from '../../common/rich-text.interface';
import { BasePropertyInterface } from '../property.interface';

export interface TitlePropertyInterface {
  type: 'title';
  title: RichTextInterface[];
}
