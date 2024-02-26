import { writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path = null } = req.query;
  if (!path) {
    res.status(400).json({ name: "no path provided" });
  } else {
    // your file content here
    const content = Date.now().toString();
    writeFileSync(`/tmp/${path}.txt`, content);
    res.json({
      path,
      content,
    });
  }
}
