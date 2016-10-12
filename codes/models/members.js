var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
	name:String,
	rtx_name:String,
	group:Number,
	role:Number
})
module.exports= new mongoose.Model('Member', memberSchema);