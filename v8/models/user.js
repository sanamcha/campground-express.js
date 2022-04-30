var mongoose = require("mongoose");
var UserSchema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

// var User = new Schema({
// 	username: String,
// 	password: String
// });
// User.plugin(passportLocalMongoose);
// module.exports = mongoose.model("User", User);

var UserSchema = new mongoose.Schema({
	username : String,
	password : String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);