var express = require('express');
var router = express.Router();
var tweet=require('../app/tweet.js');
var fs=require('fs');

/* GET home page. */
router.get('/tweet', function(req, res, next) {
  tweet.send();
  res.send('called me');
});
router.get('/64', function(req, res, next) {
	var b64=fs.readFileSync('/home/ahmar/Pictures/3.png',{encoding:'base64'});
	console.log(b64);
  res.send(b64);
});

module.exports = router;
