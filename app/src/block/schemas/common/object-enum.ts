export enum ObjectEnum {
  BLOCK = 'block',
  PAGE = 'page',
  DATABASE = 'database',
  WORKSPACE = 'workspace',
  USER = 'user',
}

export type ObjectType =
  | ObjectEnum.BLOCK
  | ObjectEnum.PAGE
  | ObjectEnum.DATABASE
  | ObjectEnum.USER;
