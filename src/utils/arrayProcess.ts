import { IResult } from "@/types/IResult";

export const sequencesTransformByCondition = (
  condition: boolean,
  temp: number[],
  current: number[]
) => {
  if (temp.length !== 0 && condition) {
    if (temp.length > current.length) {
      current.splice(0, current.length, ...temp);
    }
    temp.splice(0, temp.length);
  }
};

export const updateSequencesByCondition = (
  condition: boolean,
  newVal: number,
  tempSequence: number[],
  baseSequence: number[]
) => {
  sequencesTransformByCondition(condition, tempSequence, baseSequence);
  tempSequence.push(newVal);
};

export const getMediana = (arrayVal: number[]) => {
  if (arrayVal.length === 2) return (arrayVal[0] + arrayVal[1]) / 2;
  if (arrayVal.length === 1) return arrayVal[0];

  arrayVal.sort();

  return arrayVal.length % 2 === 0
    ? (arrayVal[arrayVal.length / 2 - 1] + arrayVal[arrayVal.length / 2]) / 2
    : arrayVal[arrayVal.length / 2 - (arrayVal.length % 2) / 2];
};

export function arrayProcess(data: string[], uploadtime: number) {
  let counter = 0;
  let minVal = 0;
  let maxVal = 0;
  let summary = 0;
  const incrSequence: number[] = [];
  const decrSequence: number[] = [];
  const tempIncrSequence: number[] = [];
  const tempDecrSequence: number[] = [];
  const arrayVal: number[] = [];
  const startTime = performance.now();

  data.forEach((line: string) => {
    if (line !== "") {
      const val = Number(line);

      counter++;
      minVal = val > minVal ? minVal : val;
      maxVal = val > maxVal ? val : maxVal;
      summary += val;
      updateSequencesByCondition(
        tempIncrSequence[tempIncrSequence.length - 1] > val,
        val,
        tempIncrSequence,
        incrSequence
      );
      updateSequencesByCondition(
        tempDecrSequence[tempDecrSequence.length - 1] < val,
        val,
        tempDecrSequence,
        decrSequence
      );
      arrayVal.push(val);
    }
  });

  const endTime = performance.now();

  const rezult: IResult = {
    state: "ok",
    counter: arrayVal.length,
    minVal,
    maxVal,
    avarage: summary / arrayVal.length,
    mediana: getMediana(arrayVal),
    decrSequence:
      tempDecrSequence.length > decrSequence.length
        ? tempDecrSequence
        : decrSequence,
    incrSequence:
      tempIncrSequence.length > incrSequence.length
        ? tempIncrSequence
        : incrSequence,
    time: endTime - startTime,
    uploadtime,
  };
  return rezult;
}
