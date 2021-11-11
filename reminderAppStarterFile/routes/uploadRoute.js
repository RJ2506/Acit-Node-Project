const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const imgur = require("imgur");
const fs = require("fs");

const { ensureAuthenticated } = require("../middleware/checkAuth");
const { json } = require("body-parser");

const storage = multer.diskStorage({
    destination: "public/uploads",
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });
const router = express.Router();
router.use(cors());
router.use(morgan("dev"));
router.use(helmet());

router.use(express.urlencoded({ extended: true }));
router.use(json({ extended: false }));

router.use(upload.any());

router.get("/upload", ensureAuthenticated, (req, res) => {
    res.render("upload");
});

router.post("/upload", async(req, res) => {
    const profile = req.user;
    const file = req.files[0];
    try {
        const url = await imgur.uploadFile(`public/uploads/${file.filename}`);
        profile.photo = url.link;
        fs.unlinkSync(`public/uploads/${file.filename}`);
        res.redirect("/dashboard");
    } catch (err) {
        console.log("error", err);
    }
});

module.exports = router;