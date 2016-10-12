var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
	name:String,
	id:Number
})

module.exports = new mongoose.Model('role', roleSchema);