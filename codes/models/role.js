var mongoose = require('mongoose');
var roleSchema = new mongoose.Schema({
	name:{type:String},
	id:{type:Number}
})
exports.Role = mongoose.model('Role', roleSchema);
