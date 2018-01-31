'use strict';

var multer  = require('multer');
var storage = multer.diskStorage({});
 var upload = multer({ storage: storage });

var fs = require('fs');
var express = require('express');
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    });

app.post('/upload', upload.single('upload'), function(req, res) {
      var upload = {
          'name': req.file.originalname,
          'size': req.file.size,
          'location': req.file.path
      }
      res.json({upload});
    });

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

