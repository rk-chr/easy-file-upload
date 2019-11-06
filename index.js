const multer = require("multer");

module.exports = (dest, fileName, type) => {
  let arr = [];

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, dest);
    },
    filename: function(req, file, cb) {
      arr.push(new Date().toISOString() + file.originalname);
      req.paths = arr;
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  if (type === "single") {
    return multer({ storage: storage }).single(fileName);
  } else if (type === "multiple") {
    return multer({ storage: storage }).array(fileName);
  } else {
    return multer().none();
  }
};
