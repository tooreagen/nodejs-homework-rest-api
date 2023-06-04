const multer = require("multer");
const path = require("path");
const moment = require("moment");
const { HttpError } = require("../helpers");

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const filenamePrefix =
      moment(Date.now()).format("DD.MM.YYYY_HH.mm.ss") +
      "_" +
      Math.round(Math.random() * 1e9);
    const newName = `${filenamePrefix}_${file.originalname}`;
    cb(null, newName);
  },
});

const limits = {
  fileSize: 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;

  if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
    cb(HttpError(400, "The file format does not match JPEG or PNG"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;
