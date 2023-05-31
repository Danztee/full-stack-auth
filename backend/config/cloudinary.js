const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const upload_to_cloudinary = async (name, picture) => {
  const uploadedResponse = await cloudinary.uploader.upload(picture, {
    public_id: name,
    folder: "profile-pic",
  });
  return uploadedResponse;
};

module.exports = upload_to_cloudinary;
