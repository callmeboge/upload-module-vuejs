const path = require("path")
const express = require("express");
const app = express();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/images/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/images/'})

app.use(express.static("./static"));
// app.use(express.json());

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.body, req.file, req.files);

    res.status(200).json({ success: true, imageInfo: req.file });
});

app.get("/uploads/assets/images/:id", (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res
            .status(404)
            .contentType("text/plain")
            .send("Error! Resources not found");
    }

    res.sendFile(path.join(__dirname, "uploads", "images", id));
});

app.listen(5000, () => {
    console.log("This Server listen to port: 5000");
});
