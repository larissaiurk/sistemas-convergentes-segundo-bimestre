const multer = require("multer");
const crypto = require("crypto");
const path = require('path')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err)

        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key);
      });
    }
  }),

  // s3: multerS3({
  //   s3: new aws.S3(),
  //   bucket: 'upload-convergentes',
  //   contentType: multerS3.AUTO_CONTENT_TYPE,
  //   acl: 'public-read',
  //   key: (req, file, cb) => {
  //     crypto.randomBytes(16, (err, hash) => {
  //       if(err) cb(err)

  //       const fileName = `${hash.toString('hex')}-${file.originalname}`

  //       cb(null, fileName);
  //     });
  //   }
  // })
}

module.exports = {
  dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
  storage: storageTypes['local'],
  limits: {
    fileSize: 2 * 1024 * 1024 
  },
  fileFiler: (req, file, cb ) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjeg',
      'image/png',
      'image/gif'
    ];
    if(allowedMimes.includes(file.mimetype)){
      cb(null, true)
    }else {
      cb(new Error('Invalid file type'))
    }
  }
}