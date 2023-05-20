const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.req.questionId + "-" + uniqueSuffix + ".mp3");
  },
});

const fileFilter = function (req, file, cb) {
  
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only audio files are allowed."));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
