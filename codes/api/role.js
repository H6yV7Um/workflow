var express = require('express');
var mongoose = require('mongoose');

require('../models/role');

var roleModel = mongoose.model('Role'); 

module.exports = {
	add:function(data, cb){
		roleModel.findOne({
			name:data.name
		},function(err, role){
			console.log(role)
			if(role){			
				cb && cb({
					code:-1
				});	
			}else{
				roleModel.create({
					name:data.name
				}, function(err, role){
					if(err){
						console.log('error');
					}else{
						console.log(role);

						cb && cb();
					}
				})		
			}
		})
		
	},
	getList:function(cb){
		var list = roleModel.find(function(err, roles){
			cb && cb(roles);
		})
	},
	has:function(role, cb){
		roleModel.findOne(role,function(err, role){
			if(role){
				cb && cb(role);
			}else{
				cb && cb();	
			}
		})
	}
}