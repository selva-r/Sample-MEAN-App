var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var loginSchema = new Schema({
   email : {
   	type:String,
   	required:true
   },
   password :{
   	type:String,
   	required:true
   }
});

var login = mongoose.model('users',loginSchema);

module.exports = login;
