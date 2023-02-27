const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv=require('dotenv');

dotenv.config();


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'get_a_pet',
    public_id: (req, file) => `${Date.now()}${String(Math.floor(Math.random() * 100))}`,
    format: async (req, file) => 'png',
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    };
  },
});

const imageUpload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error('Por favor, envie apenas imagens jpg ou png'));
    }
    cb(undefined, true);
  }
});

module.exports = { imageUpload };
