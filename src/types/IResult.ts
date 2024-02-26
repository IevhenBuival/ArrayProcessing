export interface IResult {
  state: string;
  uploadtime?: number;
  counter?: number;
  minVal?: number;
  maxVal?: number;
  avarage?: number;
  mediana?: number;
  decrSequence?: number[];
  incrSequence?: number[];
  time?: number;
}
