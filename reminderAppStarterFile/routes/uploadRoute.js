const express = require("express");
const { ensureAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

const multer = require("multer");
const pictures = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: pictures });
router.get("/upload", ensureAuthenticated, (req, res) => {
    res.render("upload");
});

router.post("/upload", upload.single("image"), (req, res) => {
    const profile = req.user;
    profile.photo = "/" + req.file.filename;
    res.render("dashboard", { user: profile });
});

module.exports = router;