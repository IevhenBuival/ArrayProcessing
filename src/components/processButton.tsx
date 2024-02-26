"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function ProcessButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="px-3 my-1 border-2 border-white rounded-sm"
    >
      <p className="font-mono font-bold">
        {pending ? "Processing..." : "  Process  "}
      </p>
    </button>
  );
}
