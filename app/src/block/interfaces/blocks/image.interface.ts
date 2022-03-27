import { BaseBlockInterface } from '../block.interface';
import { FileObjectInterface } from '../common/file-object.interface';

export interface ImageBlockInterface extends BaseBlockInterface {
  image: FileObjectInterface;
}
