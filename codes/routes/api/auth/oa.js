/**
* OA登录模块
* 添加此模块自动跳转OA登录页面，如果已登录则直接跳转相应页面
*
*/
var http = require('http');
var xmlreader = require('xmlreader');
var request  =require('request');
var crypto = require('crypto');

var appkey = '84c103c3ca2a424c83d721f5f34e7ca5',   //appkey 到tof.oa.com申请接入获取
    sysId = '24750',   //系统id  到tof.oa.com申请接入获取
    host = '/auth/oa',
    clientIp;    //访问的域名和端口

var signinUrl = 'http://passport.oa.com/modules/passport/signin.ashx?appkey={appkey}&url={' + host + '}',  //登录验证的url
    signoutUrl = 'http://passport.oa.com/modules/passport/signout.ashx?appkey={appkey}&url={' + host + '}',  //登出验证的url
    decryptTicketUrl = 'http://oss.api.tof.oa.com/api/v1/Passport/DecryptTicketWithClientIP?appkey={appkey}&encryptedTicket={encryptedTicket}&browseIP={browseIP}';

// 返回验证信息
function getInfo() {
    var random = Math.floor(Math.random() * 10000);
    var timestamp = Math.round(Date.now() / 1000);
    var data = 'random' + random + 'timestamp' + timestamp;
    //$key长度为8，不足则用减号’-’补齐
    var key = (sysId + '--------').substring(0, 8);
    var signature = encrypt(data, key);
    return {
        'appkey': appkey,
        'random': random,
        'timestamp': timestamp,
        'signature': signature
    };
}
function encrypt(data, key) {
    var key = new Buffer(key, 'ascii').toString('binary');
    var vi = key;
    var cipher = crypto.createCipheriv('des-cbc', key, vi);
    var result = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    return result.toUpperCase();
};
// 获取远程IP 兼容IPV6
function getRemoteIp(req) {
    // 依赖ipaddr模块
    var ipaddr = require('ipaddr.js');
    var ipString = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.connection.remoteAddress;

    console.log(ipString);
    if (ipaddr.isValid(ipString)) {
        try {
            var addr = ipaddr.parse(ipString);
            if (ipaddr.IPv6.isValid(ipString) && addr.isIPv4MappedAddress()) {
                return addr.toIPv4Address().toString();
            }
            return addr.toNormalizedString();
        } catch (e) {
            return ipString;
        }
    }
    return 'unknown';
}

/**
* req: http request
* res: http response
* params: url路径 i.e. adnew.qq.com/tools/display中的tools/display
* html: 需要渲染的html文件
* ejs: 用来渲染的ejs文件
* userList: String类型的Array, 用来控制权限
*/

var login = function(req, res, params, next){
	// 如果有ticket, 没有的话先跳转passport.oa.com, 这样的好处是不用setSession了，坏处是不持久
	if(req.query.ticket){
		//获取ticket
        var encryptedTicket = encodeURIComponent(req.query.ticket); //获取ticket字符串的值

        //把ticket保存到session
        // req.session.ticket = encryptedTicket;
        var headers = getInfo();
        clientIp = getRemoteIp(req);
        var url = decryptTicketUrl.replace('{appkey}', appkey).replace('{encryptedTicket}', encryptedTicket).replace('{browseIP}', clientIp);

		// 得到ticket解析的xml并分析
		request.get({ url: url,  headers: headers }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                try {
                    data.Data.avatar = 'http://dayu.oa.com/avatars/'+ data.Data.LoginName +'/profile.jpg';
                    req.session['user']={
                        name: data.Data.ChineseName,
                        username: data.Data.LoginName,
                        avatar: data.Data.avatar
                    }
                console.log(req.session['user']);
                    next();
                } catch (e) {
                    next(e);
                }
            } else {
                console.log(body);
                next(new Error(body));
            }
        });
	}else{
		var signinUrl = 'http://login.oa.com/modules/passport/signin.ashx?url={yourWebsite}';
		var homeUrl = req.protocol + "://" + req.get('host') + params;	
		signinUrl = signinUrl.replace('{yourWebsite}', encodeURIComponent(homeUrl));	
		res.redirect(signinUrl);
	}
}


exports.login = login;