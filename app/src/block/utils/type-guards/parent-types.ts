import { DatabaseParentDto } from 'src/block/dto/extra-models/parents/database-parent.dto';
import { PageParentDto } from 'src/block/dto/extra-models/parents/page-parent.dto';
import { WorkspaceParentDto } from 'src/block/dto/extra-models/parents/workspace-parent.dto';

export function isDatabaseParent(
  parent: DatabaseParentDto | PageParentDto | WorkspaceParentDto,
): parent is DatabaseParentDto {
  return (parent as DatabaseParentDto).database_id !== undefined;
}

export function isPageParent(
  parent: DatabaseParentDto | PageParentDto | WorkspaceParentDto,
): parent is PageParentDto {
  return (parent as PageParentDto).page_id !== undefined;
}
// export function isPageParentt<T>(
//   iSearchResultRes: ISearchResults<T> | MessageTrace,
// ): iSearchResultRes is ISearchResults<T> {
//   return (iSearchResultRes as ISearchResults<T>) !== undefined;
// }
