import { CreatePageDto } from 'src/block/dto/page/create-page.dto';
import { isDatabaseParent, isPageParent } from '../type-guards/parent-types';
import IPageValidator from './page-validator-interface';
import DatabaseParentValidator from './validators/database-parent-validator';
import PageParentValidator from './validators/page-parent-validator';

export default function createPageValidator(
  createPageDto: CreatePageDto,
): IPageValidator {
  if (isPageParent(createPageDto.parent)) {
    return new PageParentValidator(createPageDto);
  } else if (isDatabaseParent(createPageDto.parent)) {
    return new DatabaseParentValidator(createPageDto);
  }
}
