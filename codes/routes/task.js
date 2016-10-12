var express = require('express');
var pageConfig = require('../config/page');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('task',{
  	config:{
  		nav:pageConfig.getSortedPages()
  	}
  });
});

module.exports = router;