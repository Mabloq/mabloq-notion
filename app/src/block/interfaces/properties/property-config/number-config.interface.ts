type NumberFormat = 'number' | 'dollar' | 'number_with_commas' | 'percent';

export interface NumberConfigInterface {
  type: 'number';
  format: NumberFormat;
}
