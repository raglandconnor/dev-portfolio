"use server";
import { v2 as cloudinary, v2 } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFileToCloudinary(formData) {
  try {
    const file = formData.get("file");

    if (!file) {
      throw new Error("No file provided");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get the original file name and extension
    const originalFileName = file.name.split(".")[0];

    return new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: "auto",
        folder: "resume-review",
        public_id: originalFileName,
        use_filename: true,
        unique_filename: true,
      };

      const uploader = v2.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              fileUrl: result.secure_url,
              publicId: result.public_id,
              originalName: originalFileName,
            });
          }
        }
      );

      uploader.end(buffer);
    });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error; // Re-throw the error or handle it as needed
  }
}
