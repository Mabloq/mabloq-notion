interface Cat {
  name: string;
  age: string;
  breed: string;
}

export class ListAllEntities {
  cats: Array<Cat>;
  limit: number;
  count: number;
}
