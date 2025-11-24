import cloudinary from "cloudinary";
import streamifier from "streamifier";

// ❗dotenv প্রয়োজন নেই যদি Vercel env ব্যবহার করো
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    try {
      if (!file) {
        return reject(new Error("No file provided"));
      }

      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "assignments",

          // 🔥 IMPORTANT FOR NON-IMAGE FILES (PDF, DOCX, ZIP)
          resource_type: "raw",

          // Naming options
          use_filename: true,
          unique_filename: false,
          filename_override: file.originalname,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(error);
          }

          if (!result) {
            return reject(new Error("Cloudinary returned no result"));
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            originalFilename: result.original_filename,
          });
        }
      );

      // Stream the buffer
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    } catch (err) {
      reject(err);
    }
  });
};
