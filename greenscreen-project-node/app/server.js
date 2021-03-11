

const express = require('express');
const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');

const app = express();

app.use(express.static("public_html"));
app.use(express.static("uploads"));

const port = 3000;
const hostname = "localhost";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.post('/upload-pictures', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter })
    .fields([
            { name: 'profile_pic', maxCount: 1},
            { name: 'background_pic', maxCount: 1},
        ]);

    upload(req, res, function(err) {
        // req.files is an array that contains information of uploaded files
        // req.body contains information of text fields/radio buttons, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files['profile_pic']) {
            //No profile picture was selected
            return res.send('Please select a profile picture to upload');
        }
        else if(!req.files['background_pic']){
            //No uploaded background - CHECK if a radio button was ticked
            if (req.body['bg-radio'] !== undefined) {
                res.send(`Selected ${req.body['bg-radio']}`);
            }else{
                res.send("Upload a background or select a template background.")
            }
        }
        else if (err instanceof multer.MulterError || err) {
            return res.send(err);
        }

       
        // Display uploaded image for user validation
        //res.send(`You have uploaded this image: <hr/><img src="${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
});


app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});



