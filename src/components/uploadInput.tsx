"use client";
import React, { ChangeEvent } from "react";
export default function UploadInput() {
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
      />
    </div>
  );
}
