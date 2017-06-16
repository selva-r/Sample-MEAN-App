var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var contactSchema = new Schema({
     name:{
     	type:String
     },
     mobile:{
     	type:Number
     }
});

var contact = mongoose.model('Contacts',contactSchema);

module.exports = contact;

