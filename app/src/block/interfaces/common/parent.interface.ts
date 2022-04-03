export interface DatabaseParentInterface {
  database_id: string;
}

export interface PageParentInterface {
  page_id: string;
}

export interface WorkspaceParentInterface {
  workspace_id: string;
}

export type ParentInerface =
  | WorkspaceParentInterface
  | DatabaseParentInterface
  | PageParentInterface;
