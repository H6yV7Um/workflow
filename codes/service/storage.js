var fs = require('fs');
var path = require('path');
var affix = '.json';
var encoding = 'utf-8';

module.exports = {
	read:function(filePath, callback){
		fs.readFile(filePath+affix, encoding, callback);
	},
	write:function(filePath, data, callback){
		console.log(fs)
		fs.write(filePath+affix, data, encoding, callback);	
	}
}