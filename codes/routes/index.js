var express = require('express');
var pageConfig = require('../config/page.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	config:{
  		nav:pageConfig.getSortedPages()
  	}
  });
});

module.exports = router;
