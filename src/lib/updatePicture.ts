import { uploadFile } from '@/lib/uploadPicture';
import { deleteFile } from "@/lib/deletePicture";

interface UpdateFileOptions {
  newFile: File | null;
  oldPublicId: string;
  folder?: string;
}

export const updateFile = async ({
  newFile,
  oldPublicId,
  folder = "uploads",
}: UpdateFileOptions) => {
  try {
    if (!newFile) {
      return { success: false, message: "No new file provided" };
    }

    // পুরনো ফাইল থাকলে মুছে ফেলো
    if (oldPublicId) {
      await deleteFile(oldPublicId);
    }

    // নতুন ফাইল upload করো
    const uploaded = await uploadFile(newFile, folder);

    if (!uploaded) {
      return { success: false, message: "File upload failed" };
    }

    return { success: true, data: uploaded };
  } catch (error) {
    console.error("File update error:", error);
    return { success: false, message: "Update failed" };
  }
};