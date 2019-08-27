var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	image: String,
	password: String,
	firstName: String,
	lastName: String,
	dob: Date,
	email: {type: String, unique: true, required: true},
	resetPasswordToken: String,
    resetPasswordExpires: Date,
	mobileNo: Number,
	institute: String,
	gender: {type: String, required: true},
});



UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);