import { uploadFile } from '@/lib/uploadPicture';
import { deleteFile } from "@/lib/deletePicture";

interface UpdateFileOptions {
  newFile: File | null;
  oldPublicId?: string; // optional
  folder?: string;
}

export const updateFile = async ({
  newFile,
  oldPublicId,
  folder = "uploads",
}: UpdateFileOptions) => {
  try {
    // যদি new file না থাকে, কিছুই করো না
    if (!newFile) {
      return { success: false, message: "No new file provided" };
    }

    // পুরনোটা থাকলে আগে মুছে ফেলো
    if (oldPublicId) {
      await deleteFile(oldPublicId);
    }

    // নতুনটা upload করো
    const uploaded = await uploadFile(newFile, folder);
    return uploaded;
  } catch (error) {
    console.error("File update error:", error);
    return { success: false, message: "Update failed" };
  }
};