module.exports = app => {
  var router = require("express").Router();
  const multer = require('multer');
  const path = require('path');
  const controller = require("../Controllers/file_controller");
  // const { authJwt } = require('../Middleware');

  const storage = multer.diskStorage({
    destination:'./Storage/chat/',
    filename:(req, file, cb) => {
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  const upload = multer({
    storage: storage
  })


  router.get("/:fileid",controller.getDataFile);
  router.post("/upload",upload.single('filename'),controller.create);

  app.use('/api/file', router);
};  