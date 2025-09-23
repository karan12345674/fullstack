import multer from "multer";
import path from "path";

// File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads folder me save hoga
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + file.originalname;
    cb(null, uniqueSuffix);
  }
});

// File filter (image/video only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4", "video/mkv"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image or video files allowed"));
};

export const uploadFile = multer({ storage, fileFilter });