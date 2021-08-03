const express = require('express');
const multer = require('multer');
//file upload folder
const fileUpload = './uploads/';
//prepare the final upload multer object
var storages = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, fileUpload);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storages,
    fileFilter: (req, file, cb) => {
        if(
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png"  ||
            file.mimetype === "image/jpg"
        ) {
            cb(null, true)
        } else {
            cb(new Error('only jpeg , png , jpg format supported'));
        }
    }
});
const app = express();

app.post('/insert', upload.array('avater', 2), (req, res) => {
    res.send('file is uploaded');
});


//default error handler
app.use((err, req, res, next) => {
    if(err) {
        if(err instanceof multer.MulterError){
            res.status(500).send('there was an upload error')
        } else {
            res.status(500).send(err.message)
        }
    } else {
        res.send('succesxx')
    }
});

app.listen(3000, () => {
    console.log('our app is running');
});