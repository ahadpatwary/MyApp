import fs from "fs";
import path from "path";

export async function urlToFile(url: string) {
    try {
    
        const response = await fetch(url);

        if (!response.ok) {
            return { success: false, message: "Failed to download file" };
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileName = `temp_${Date.now()}${path.extname(url)}`;
        const filePath = path.join(process.cwd(), fileName);

        fs.writeFileSync(filePath, buffer);

        return { success: true, filePath };

    } catch (error) {
        console.error("urlToFile error:", error);
        return { success: false, message: "Internal program error, try again!" };
    }
}