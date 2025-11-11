const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadBufferToCloudinary(buffer, folder, resourceType = 'image') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: resourceType }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
}

// Middleware to process files in req.files and attach URLs to req.uploads
exports.handleUploads = async (req, res, next) => {
  try {
    if (!req.files) return next();

    const uploads = { images: [], documents: [] };

    const imageFiles = req.files.images || [];
    const documentFiles = req.files.documents || [];

    for (const f of imageFiles) {
      const result = await uploadBufferToCloudinary(f.buffer, 'land-platform/images', 'image');
      uploads.images.push(result.secure_url);
    }

    for (const f of documentFiles) {
      const result = await uploadBufferToCloudinary(f.buffer, 'land-platform/documents', 'raw');
      uploads.documents.push(result.secure_url);
    }

    req.uploads = uploads;
    next();
  } catch (error) {
    next(error);
  }
};

exports.uploadFields = upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'documents', maxCount: 10 }
]);


