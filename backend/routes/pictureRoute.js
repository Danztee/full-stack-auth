const express = require("express");
const { uploadPicture } = require("../controllers/pictureController");

const router = express.Router();

router.post("/", uploadPicture);

module.exports = router;
