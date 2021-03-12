

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
        cb(null, file.fieldname + path.extname(file.originalname));
    }
});

app.post('/upload-pictures', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    // 'background_pic' is the name of our file input field in the HTML form
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
                res.send(
                    `You have uploaded this profile image: <hr/><canvas id="c1"></canvas><hr /><a href="./">Upload another image</a>
                    <br/>This is your final image: <hr/><canvas id="c2"></canvas><hr /><a href="./">Upload another image</a>
		    <script type="text/javascript">
			let processor = {
			timerCallback: function() {	
			this.computeFrame();
			let self = this;
    			setTimeout(function() {
      			  self.timerCallback();
      			}, 0);
  			},
			doLoad: function() {
			  this.green = new Image();
			  this.green.src = "${req.files['profile_pic'][0].filename}";			  
			  this.c1 = document.getElementById('c1');
			  this.ctx1 = this.c1.getContext('2d');
			  this.c2 = document.getElementById('c2');
			  this.ctx2 = this.c2.getContext('2d');
			  this.back = new Image();
			  this.back.src = "${req.body['bg-radio']}.jpg";
			  this.c2.width = this.back.naturalWidth;
			  this.c2.height = this.back.naturalHeight;
			  this.c1.width = this.green.naturalWidth;
			  this.c1.height = this.green.naturalHeight;
			  let self = this;
 			  self.width = self.green.naturalWidth;
			  self.height = self.green.naturalHeight;
      			  self.timerCallback();
 			},
			computeFrame: function() {
			  this.ctx1.drawImage(this.green, this.green.naturalWidth/2 - this.width/2, this.green.naturalHeight/2 - this.height/2, this.width, this.height);
			  let frame = this.ctx1.getImageData(this.green.naturalWidth/2 - this.width/2, this.green.naturalHeight/2 - this.height/2, this.width, this.height);
			  let l = frame.data.length / 4;
			  for (let i = 0; i < l; i++) {
			    let r = frame.data[i * 4 + 0];
			    let g = frame.data[i * 4 + 1];
			    let b = frame.data[i * 4 + 2];
			    if (g > 50 && r < 50 && b < 50)
			      frame.data[i * 4 + 3] = 0;
			  }
			    let canvas = document.getElementById("c2");
			    canvas.style.backgroundImage = "url('${req.body[`bg-radio`]}.jpg')";
			    this.ctx2.putImageData(frame, this.c2.width/2 - this.width/2, this.c2.height/2 - this.height/2);
			    return;
			  }  
			};
			processor.doLoad();
		    </script>`
                    );
            }else{
                res.send("Upload a background or select a template background.")
            }
        }
        else if (err instanceof multer.MulterError || err) {
            return res.send(err);
        }else{
            //Both images were uploaded successfully
            //Display uploaded image for user validation
            res.send(
                `You have uploaded this profile image: <hr/><canvas id="c1"></canvas><hr /><a href="./">Upload another image</a>
                 <br/>This is your final image: <canvas id="c2"></canvas><hr /><a href="./">Upload another image</a>
		    <script type="text/javascript">
			let processor = {
			timerCallback: function() {
    			this.computeFrame();
    			let self = this;
    			setTimeout(function() {
      			  self.timerCallback();
      			}, 0);
  			},
			doLoad: function() {
			  this.green = new Image();
			  this.green.src = "${req.files['profile_pic'][0].filename}";			  
			  this.c1 = document.getElementById('c1');
			  this.ctx1 = this.c1.getContext('2d');
			  this.c2 = document.getElementById('c2');
			  this.ctx2 = this.c2.getContext('2d');
			  this.back = new Image();
			  this.back.src = "${req.files['background_pic'][0].filename}";
			  this.c2.width = this.back.naturalWidth;
			  this.c2.height = this.back.naturalHeight;
			  this.c1.width = this.green.naturalWidth;
			  this.c1.height = this.green.naturalHeight;
			  let self = this;
			  
 			  self.width = self.green.naturalWidth;
			  self.height = self.green.naturalHeight;
      			  self.timerCallback();

 			},
			computeFrame: function() {
			  this.ctx1.drawImage(this.green, this.green.naturalWidth/2 - this.width/2, this.green.naturalHeight/2 - this.height/2, this.width, this.height);
			  let frame = this.ctx1.getImageData(this.green.naturalWidth/2 - this.width/2, this.green.naturalHeight/2 - this.height/2, this.width, this.height);
			  let l = frame.data.length / 4;
    
			  for (let i = 0; i < l; i++) {
			    let r = frame.data[i * 4 + 0];
			    let g = frame.data[i * 4 + 1];
			    let b = frame.data[i * 4 + 2];
			    if (g > 50 && r < 50 && b < 50)
			      frame.data[i * 4 + 3] = 0;
			    }

			    let canvas = document.getElementById("c2");
			    canvas.style.backgroundImage = "url('${req.files['background_pic'][0].filename}')";
			    this.ctx2.putImageData(frame, this.c2.width/2 - this.width/2, this.c2.height/2 - this.height/2);
			    return;
			  }
			};

			processor.doLoad();
		    </script>`
            ); //The [0] is required to access the file attributes such as name, path, etc.
        }
    });
});


app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});



