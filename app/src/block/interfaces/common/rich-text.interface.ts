import { AnnotationInterface } from './annotation.interface';
import { TextInterface } from './text.interface';

export interface RichTextInterface {
  plain_text: string;
  href?: string;
  type: string;
  text: TextInterface;
  annotation?: AnnotationInterface;
}
