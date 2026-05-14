import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const baseUploadDir = path.resolve(process.cwd(), "uploads");

<<<<<<< HEAD
const verificaDir = dir => {
=======
const verificaDir = (dir) => {
>>>>>>> bfa9f9d9f8ae3974d8740861fa9ddfcf671fc5e2
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createMulter = ({ folder, allowedTypes, fileSize }) => {
  const uploadDir = path.join(baseUploadDir, folder);

  verificaDir(uploadDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(18).toString("hex");
      cb(null, `${hash}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Tipo de arquivo não permitido"));
    }

    cb(null, true);
  };
  return multer({
    storage,
    limits: { fileSize },
    fileFilter,
  });
};

<<<<<<< HEAD
export default createMulter;
=======
export default createMulter;
>>>>>>> bfa9f9d9f8ae3974d8740861fa9ddfcf671fc5e2
