"use client";
import React, { ChangeEvent } from "react";

interface IUploadInput {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export default function UploadInput({ inputRef }: IUploadInput) {
  const loadPreview = (file: File) => {
    if (file.type.toString() !== "text/plain") {
      throw new Error("File type mismatch");
    }
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      loadPreview(e.target.files[0]);
    }
  }

  return (
    <div>
      <input
        name="file"
        type="file"
        multiple={false}
        onChange={handleChange}
        accept="*.txt"
        ref={inputRef}
      />
    </div>
  );
}
