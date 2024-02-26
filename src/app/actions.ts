"use server";
import { IResult } from "@/types/IResult";
import { revalidatePath } from "next/cache";
import fs from "node:fs"; //fs
import readline from "readline";
import fsPromises from "fs/promises";

const PATH_TMP = "public/tmp.txt";

const fileProcess = async () => {
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
  const getMediana = () => {
    if (arrayVal.length === 2) return (arrayVal[0] + arrayVal[1]) / 2;
    if (arrayVal.length === 1) return arrayVal[0];

    arrayVal.sort();

    return arrayVal.length % 2 === 0
      ? (arrayVal[arrayVal.length / 2 - 1] + arrayVal[arrayVal.length / 2]) / 2
      : arrayVal[arrayVal.length / 2 - (arrayVal.length % 2) / 2];
  };

  const tempSequencesUpdate = (newVal: number) => {
    if (
      tempIncrSequence.length !== 0 &&
      tempIncrSequence[tempIncrSequence.length - 1] > newVal
    ) {
      if (tempIncrSequence.length > incrSequence.length) {
        incrSequence.splice(0, incrSequence.length, ...tempIncrSequence);
      }
      tempIncrSequence.splice(0, tempIncrSequence.length);
    }
    tempIncrSequence.push(newVal);

    if (
      tempDecrSequence.length !== 0 &&
      tempDecrSequence[tempDecrSequence.length - 1] < newVal
    ) {
      if (tempDecrSequence.length > decrSequence.length) {
        decrSequence.splice(0, decrSequence.length, ...tempDecrSequence);
      }
      tempDecrSequence.splice(0, tempDecrSequence.length);
    }
    tempDecrSequence.push(newVal);
  };

  const fileToArray = async (filepath: string) => {
    const input = fs.createReadStream(filepath);
    const res: string = await new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input,
        crlfDelay: Infinity,
      });
      rl.on("line", (line: string) => {
        const val = Number(line);
        counter++;
        minVal = val > minVal ? minVal : val;
        maxVal = val > maxVal ? val : maxVal;
        summary += val;
        tempSequencesUpdate(val);
        arrayVal.push(val);
      });
      rl.once("close", () => resolve("ok"));
      rl.once("error", (err) => reject(JSON.stringify(err)));
    });

    return res;
  };

  const filepath = PATH_TMP;

  const res = fileToArray(filepath)
    .then((state) => {
      const endTime = performance.now();

      const rezult: IResult = {
        state,
        counter: arrayVal.length,
        minVal,
        maxVal,
        avarage: summary / arrayVal.length,
        mediana: getMediana(),
        decrSequence:
          tempDecrSequence.length > decrSequence.length
            ? tempDecrSequence
            : decrSequence,
        incrSequence:
          tempIncrSequence.length > incrSequence.length
            ? tempIncrSequence
            : incrSequence,
        time: endTime - startTime,
      };
      return { ...rezult };
    })
    .catch((e) => {
      console.error;
      return { status: e };
    });
  return res;
};

export async function processFile(prevState: IResult, formData: FormData) {
  const dataFile = formData.get("file") as File;
  const bytes = await dataFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await fsPromises.writeFile(PATH_TMP, buffer);
  const result = await fileProcess();
  revalidatePath("/");
  return result as IResult;
}
