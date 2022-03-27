import { BaseBlockInterface } from '../block.interface';
import { FileObjectInterface } from '../common/file-object.interface';

export interface FileBlockInterface extends BaseBlockInterface {
  file: FileObjectInterface;
}
