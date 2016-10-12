var webpack = require('webpack');
var plugins = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
	plugins:[plugins],
	entry:{
		index:'./app/js/index.js',
		member:'./app/js/member.js',
		task:'./app/js/task.ts',
		project:'./app/js/project.js',
	},
	resolve:{
		extensions:["", ".webpack.js", ".web.js", ".ts", ".js", ".scss"]
	},
	output:{
		path:'public/javascripts/',
		filename:'[name].js'
	},
	module:{
		loaders:[
			{test:/\.scss$/,loader:'style!css!sass?sourceMap'},
			{test:/\.ts$/,loader:'ts-loader'}
		]
	}	
}