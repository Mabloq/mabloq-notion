export interface DatabaseParentInterface {
  type: string;
  database_id: string;
}

export interface PageParentInterface {
  type: string;
  page_id: string;
}

export interface WorkspaceParentInterface {
  type: string;
  workspace_id: string;
}

export type ParentInerface =
  | WorkspaceParentInterface
  | DatabaseParentInterface
  | PageParentInterface;
