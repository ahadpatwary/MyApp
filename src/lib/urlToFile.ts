// lib/urlToFile.ts
import fs from "fs";
import path from "path";

export async function urlToFile(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) 
    throw new Error("❌ Failed to download file");

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = `temp_${Date.now()}${path.extname(url)}`;
  const filePath = path.join(process.cwd(), fileName);

  fs.writeFileSync(filePath, buffer);
  console.log("✅ File created from URL:", filePath);

  return filePath;
}