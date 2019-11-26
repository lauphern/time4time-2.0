const express = require( 'express' );
const router = express.Router();
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

// TODO desinstalar url si al final no lo necesito
// const url = require('url');

const s3 = new aws.S3({
  accessKeyId: process.env.S3ACCESSKEYID,
  secretAccessKey: process.env.S3ACCESSKEY,
  Bucket: process.env.S3BUCKET
});


/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );
   if( mimetype && extname ){
     return cb( null, true );
    } else {
     cb( 'Error: Images Only!' );
    }
}

/**
 * Single Upload
 */
const singleUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: process.env.S3BUCKET,
  acl: 'public-read',
  key: function (req, file, cb) {
   cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    // cb(null, Date.now().toString())
  }
 }),
//  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
//  fileFilter: function( req, file, cb ){
//   checkFileType( file, cb );
//  }
})

// TODO make it reusable for different components, maybe having the general code and adding the .single and saving that in variables

/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */
// Multiple File Uploads ( max 4 )
// TODO podria usar esto para las reviews
// pero poner validation en el frontend para que sea opcional y no crash cuando no subes una foto
const multipleUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: process.env.S3BUCKET,
  acl: 'public-read',
  key: function (req, file, cb) {
   cb( null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  }
 }),
 limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).array( 'galleryImage', 4 );


module.exports = {
    singleUpload, multipleUpload
};