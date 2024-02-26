"use client";

import { IResult } from "@/types/IResult";
import ResultBox from "./resultBox";
import { useFormState } from "react-dom";
import { processFile } from "@/app/actions";
import UploadInput from "./uploadInput";
import ProcessButton from "./processButton";

const initialState: IResult = { state: "init" };
export default function ProcessFileForm() {
  const [state, formAction] = useFormState(processFile, initialState);
  return (
    <form action={formAction}>
      <div className="px-3 mt-1 border border-white rounded-sm"></div>
      <h3 className="font-mono font-bold">Instructions:</h3>
      <ul className="mb-3">
        <li className="">
          1. Select txt file with data for processing by Choose File button
        </li>
        <li className="">2. Press Process button</li>
      </ul>

      <UploadInput />
      <ProcessButton />

      <ResultBox state={state} />
    </form>
  );
}
