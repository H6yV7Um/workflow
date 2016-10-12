var express = require('express');
var pageConfig = require('../config/page');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('project',{
  	config:{
  		nav:pageConfig.getSortedPages()
  	}
  });
});

module.exports = router;