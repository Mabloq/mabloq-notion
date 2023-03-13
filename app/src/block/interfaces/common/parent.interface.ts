export interface DatabaseParentInterface {
  type: 'database_id';
  database_id: string;
}

export interface PageParentInterface {
  type: 'page_id';
  page_id: string;
}

export interface WorkspaceParentInterface {
  type: 'workspace_id';
  workspace_id: string;
}

export type ParentInerface =
  | WorkspaceParentInterface
  | DatabaseParentInterface
  | PageParentInterface;
