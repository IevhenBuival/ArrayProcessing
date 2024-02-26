import { useEffect, useState } from "react";
import { IResult } from "../types/IResult";

interface IResultBox {
  state: IResult;
}
export default function ResultBox({ state }: IResultBox) {
  const getStateMap = () => {
    const stateMapResult: { key: string; value: string }[] = [];
    Object.keys(state).forEach((key) => {
      if (key === "state") return;
      if (key === "decrSequence" || key === "incrSequence")
        stateMapResult.push({
          key,
          value: JSON.stringify(state[key as keyof IResult], null, 2),
        });
      else
        stateMapResult.push({
          key,
          value: state[key as keyof IResult] as string,
        });
    });
    return stateMapResult;
  };
  const stateMap = getStateMap();
  return (
    <div className="px-3 mt-1 border border-white rounded-sm w-full text-wrap">
      {state.state === "ok" && (
        <>
          <h3 className="font-mono font-bold">Resalts of last processing:</h3>
          {stateMap.map((el) => {
            return (
              <div
                key={el.key}
                className="flex flex-wrap w-full text-wrap border border-white "
              >
                <span>{el.key}</span>:<pre>{el.value}</pre>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
