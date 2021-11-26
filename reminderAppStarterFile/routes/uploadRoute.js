const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const imgur = require("imgur");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

router.use(upload.any());

router.get("/upload", ensureAuthenticated, async(req, res) => {
    const user_id = await req.user;
    res.render("upload", { user: user_id });
});

router.post("/upload/:id", async(req, res) => {
    const id = req.params.id;

    const file = req.files[0];
    try {
        const url = await imgur.uploadFile(`public/uploads/${file.filename}`);
        let searchResult = await prisma.user.findFirst({
            where: { id: id },
        });
        searchResult = await prisma.user.update({
            where: { id: id },
            data: {
                photo: url.link,
            },
        });

        fs.unlinkSync(`public/uploads/${file.filename}`);
        res.redirect("/dashboard");
    } catch (err) {
        console.log("error", err);
    }
});

module.exports = router;