const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

/* UPLOAD CUSTOM IMAGE */

router.post("/custom-upload", upload.single("image"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "Image uploaded successfully",
    filename: req.file.filename
  });

});


/* DELETE CUSTOM IMAGE */

router.delete("/custom-upload/:filename", (req, res) => {

  const filePath = path.join(__dirname, "..", "uploads", "custom", req.params.filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.json({ message: "Custom image deleted" });
  }

  res.status(404).json({ message: "File not found" });

});

module.exports = router;