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
 * Single Upload
 */
const profileImgUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: 'onclick',
  acl: 'public-read',
  key: function (req, file, cb) {
   cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  }
 }),
 limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).single('profileImage');
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
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post('/profile-img-upload', ( req, res ) => {
  profileImgUpload( req, res, ( error ) => {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if( error ){
      console.log( 'errors', error );
      res.json( { error: error } );
    } else {
      // If File not found
      if( req.file === undefined ){
        console.log( 'Error: No File Selected!' );
        res.json( 'Error: No File Selected' );
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation
        });
      }
    }
  });
});


/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */
// Multiple File Uploads ( max 4 )
// TODO podria usar esto para las reviews
// pero poner validation en el frontend para que sea opcional y no crash cuando no subes una foto
const uploadsBusinessGallery = multer({
 storage: multerS3({
  s3: s3,
  bucket: 'onclick',
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
/**
 * @route POST /api/profile/business-gallery-upload
 * @desc Upload business Gallery images
 * @access public
 */
router.post('/multiple-file-upload', ( req, res ) => {
uploadsBusinessGallery( req, res, ( error ) => {
  console.log( 'files', req.files );
  if( error ){
   console.log( 'errors', error );
   res.json( { error: error } );
  } else {
   // If File not found
   if( req.files === undefined ){
    console.log( 'Error: No File Selected!' );
    res.json( 'Error: No File Selected' );
   } else {
    // If Success
    let fileArray = req.files,
     fileLocation;
const galleryImgLocationArray = [];
    for ( let i = 0; i < fileArray.length; i++ ) {
     fileLocation = fileArray[ i ].location;
     console.log( 'filenm', fileLocation );
     galleryImgLocationArray.push( fileLocation )
    }
    // Save the file name into database
res.json( {
     filesArray: fileArray,
     locationArray: galleryImgLocationArray
    } );
   }
  }
 });
});
// We export the router so that the server.js file can pick it up
module.exports = router;