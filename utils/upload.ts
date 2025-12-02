import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const uploadImage = async (image: File): Promise<string> => {
  try {
    const response = await utapi.uploadFiles(image);

    if (!response || !response.data) {
      throw new Error("Image upload failed - no response data");
    }

    // uploadFiles returns the uploaded file data with a key property
    const fileData = response.data;

    // Construct and return the public URL
    return `https://utfs.io/f/${fileData.key}`;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload image");
  }
};
