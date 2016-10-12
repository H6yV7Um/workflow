var express = require('express');
var pageConfig = require('../config/page');
var router = express.Router();
var storage = require('../service/storage');

/* GET users listing. */
router.get('/', function(req, res, next) {
  /*res.render('member',{
  	config:{
  		nav:pageConfig.getSortedPages()
  	}
  });*/
  next();
});

router.get('/add',function(req, res, next){
	storage.write('../data/member/'+req.params.name,function(){
		res.send('0');
	});
})
router.post('/edit',function(req, res, next){

})
router.get('/delete',function(req, res, next){

})
router.get('/list',function(req, res, next){

})


module.exports = router;
