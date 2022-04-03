export enum ObjectEnum {
  BLOCK = 'block',
  PAGE = 'page',
  DATABASE = 'database',
  USER = 'user',
}

export type ObjectType =
  | ObjectEnum.BLOCK
  | ObjectEnum.PAGE
  | ObjectEnum.DATABASE
  | ObjectEnum.USER;
