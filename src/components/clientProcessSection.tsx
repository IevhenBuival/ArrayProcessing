"use client";

import { IResult } from "@/types/IResult";
import { arrayProcess } from "@/utils/arrayProcess";
import { useState } from "react";
import ResultBox from "./resultBox";

const localFileProcess = async (
  input: HTMLInputElement,
  callback: (r: IResult) => void
) => {
  if (input.files !== null) {
    const file = input.files[0];
    const startTime = performance.now();
    if (!file) throw new Error("cant read file");
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) throw new Error("cant read file");
      const textContent = e.target.result;
      if (typeof textContent !== "string") throw new Error("cant read file");

      const lines = textContent.split("\n");
      const stopTime = performance.now();
      callback(arrayProcess(lines, stopTime - startTime));
    };
    reader.onerror = (e) => {
      console.error(`Error occured while reading ${file.name}`);
      throw new Error("cant read file");
    };
    reader.readAsText(file);
  }
};

interface IClientProcessButton {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export default function ClientProcessSection({
  inputRef,
}: IClientProcessButton) {
  const [rez, setRez] = useState({ state: "init" } as IResult);
  const [pending, setPending] = useState(false);
  return (
    <section className="basis-1/2">
      <button
        type="button"
        disabled={pending}
        className="px-3 my-1 border-2 border-white rounded-sm"
        onClick={() => {
          setPending(true);
          if (inputRef.current !== null)
            localFileProcess(inputRef.current, (result) => {
              console.log("start");

              setRez(result);
              setPending(false);
              console.log("end");
            });
        }}
      >
        <p className="font-mono font-bold w-60">
          {pending ? "Processing on Client..." : "Process on Client"}
        </p>
      </button>
      <ResultBox state={rez} />
    </section>
  );
}
