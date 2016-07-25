var express = require('express');
var router = express.Router();
var tweet=require('../app/tweet.js');


/* GET home page. */
router.get('/tweet', function(req, res, next) {
  tweet.send();
  res.send('called me');
});

module.exports = router;
