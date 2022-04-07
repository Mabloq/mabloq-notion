export interface SelectOptionInterface {
  id: string;
  color: string;
  name: string;
}

export interface SelectConfigInterface {
  type: 'select';
  options: SelectOptionInterface[];
}
