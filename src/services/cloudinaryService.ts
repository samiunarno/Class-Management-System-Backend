import cloudinary from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "assignments",

        // 🔥 MOST IMPORTANT FIXES:
        resource_type: "raw",
        use_filename: true,        // Keep original name
        unique_filename: false,    // Don't rename
        filename_override: file.originalname, // Extra safety
      },
      (error, result) => {
        if (error) {
          console.error("UPLOAD ERROR:", error);
          return reject(error);
        }

        resolve({
          url: result!.secure_url,
          publicId: result!.public_id,
          originalFilename: result!.original_filename,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
