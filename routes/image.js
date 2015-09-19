var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');


var upload = multer({
    dest: './public/images/',
    limits: {fileSize: 10000000, files:1}
});


/* GET image listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', [upload, function(req, res, next) {

  console.log(req.files);

  var filename = req.files.image.name;
  var extension = filename.split('.')[filename.split('.').length-1];
  console.log(filename);
  var newFileName = (new Date().getTime())+"."+extension;
  console.log(newFileName);

  fs.rename('./public/images/'+filename,
    './public/images/'+ newFileName,
    function(err) {
      if (err) {
        //handle
      }
      console.log("renamed "+filename+" to "+newFileName);
  });

  var dbjson = req.dbjson;
  var resultJSON = {};
  resultJSON.imageLocation = '/images/'+newFileName;

    //parser json file goes here





  dbjson.push(resultJSON); //Test


  res.send(JSON.stringify(resultJSON));
}]);

module.exports = router;
