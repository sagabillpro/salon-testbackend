// uploadService.js
import cloudinary from "../config/cloudinaryconfig";

/**
 * Uploads a base64-encoded image to Cloudinary.
 * @param {string} base64Image - The base64 image string.
 * @param {string} folderName - Folder in Cloudinary where the image will be stored.
 * @returns {Promise<string>} - Resolves to the secure URL of the uploaded image.
 */
export async function uploadImageToCloudinary(
  base64Image: string,
  folderName: string
): Promise<Error | string> {
  try {
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: folderName,
      resource_type: "image",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}
