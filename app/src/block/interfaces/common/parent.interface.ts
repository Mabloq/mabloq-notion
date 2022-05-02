export interface DatabaseParentInterface {
  type: 'database';
  database_id: string;
}

export interface PageParentInterface {
  type: 'page';
  page_id: string;
}

export interface WorkspaceParentInterface {
  type: 'workspace';
  workspace_id: string;
}

export type ParentInerface =
  | WorkspaceParentInterface
  | DatabaseParentInterface
  | PageParentInterface;
