var express = require('express');
var router = express.Router();
var roleApi = require('../../api/role');

router.get('/add', function(req, res, next){
	roleApi.add(req.query, function(ret){
		var ret = ret || {code:0};
		res.json(ret);
	});
})

router.get('/list', function(req, res, next){
	roleApi.getList(function(roles){
		res.json({
			code:0,
			data:roles
		});
	});
})

module.exports = router;