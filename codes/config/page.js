var PAGES = {
	"index":{
		"name":"index",
		"router":"/"
	},
	"member":{
		"name":"member",
		"router":"/member"
	},	
	"task":{
		"name":"task",
		"router":"/task"
	},	
	"project":{
		"name":"project",
		"router":"/project"
	}
}

var NAV_SORT = ["index","member","project","task"];

module.exports = {
	getNavSort:function(){
		return NAV_SORT;
	},
	getSortedPages:function(){
		var ret=[];
		for(var i=0,il=NAV_SORT.length;i<il;i++){
			ret.push(PAGES[NAV_SORT[i]]);
		}
		return ret;
	},
	getPages:function(){
		return PAGES;
	},
	getOnePage:function(pageName){
		return PAGES[pageName];
	}
}