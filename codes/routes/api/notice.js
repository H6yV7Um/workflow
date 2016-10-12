var express = require('express');
var router = express.Router();
var request = require('request');
var iconv = require('iconv-lite');

var xmlReader = require('xmlreader');
var noticeRoot = "https://om.qq.com/notice"
var Q = require('q');

var NOTICE_LIST_API = 'http://10.168.26.153/cgi-bin/article/generate_articlexml?site=om&catalog=notice_n&start=0&cnt=';


module.exports = {
	getList:function(cb){	
		var notices = [], noticeNum = 10;
		request.get({url:NOTICE_LIST_API, encoding:null},function(error, res, body){
			
			if(null !== error){
				cb();
				return;
			}

			body = iconv.decode(body, 'GB2312').toString();
			console.log("body is:"+body);
			xmlReader.read(body,function(error, response){
				var curTimetamp = new Date().getTime();
				
				if(null !== error){
					console.log("get notice list:"+error);
					cb();
				}

				response.Catalog.article.each(function(i, art){
					if(i>=noticeNum){return false;}

					var pubtime = art.pubtime.text(),
						isnew = (curTimetamp - new Date(pubtime).getTime()) < 1728000000;//20天以内为新通知
					
					notices.push({
						title:art.title.text(),
						url:noticeRoot+art.url.text(),
						date:art.pubtime.text(),
						isnew:isnew
					})
				})

				cb(notices);
			});
		})	
	}
}