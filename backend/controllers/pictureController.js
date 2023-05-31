const upload_to_cloudinary = require("../config/cloudinary");
const Picture = require("../models/pictureSchema");

const uploadPicture = async (req, res) => {
  const { picture, name } = req.body;
  try {
    if (!picture || !name) throw new Error("please provide a picture");
    const data = await upload_to_cloudinary(name, picture);

    const response = await Picture.create({ image_url: data.secure_url });

    if (!response) throw new Error("something went wrong");

    res.status(201).json({ message: "profile picture updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadPicture };
