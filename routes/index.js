var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");



//Homepage
router.get("/",function(req,res){
    res.render("index");
});

//Login

router.get("/login",middleware.isLoggedOut, function(req,res){
	res.render("login");
});

router.post("/login",middleware.isLoggedOut, passport.authenticate("local",
	{
		successRedirect:"/getUser",
		failureRedirect:"/redirectlogin"
	}),function(req,res){
});

//Register
router.get("/register",middleware.isLoggedOut,function(req,res){
	res.render("register");
});

router.post("/register",middleware.isLoggedOut,function(req,res){
	

    if(req.body.gender.toLowerCase()=="female"){
    	var image = "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }else{
    	var image = "https://images.unsplash.com/photo-1510552776732-03e61cf4b144?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    }
    var newUser = new User(

    	{
    	    username:req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
			email: req.body.email,
			mobileNo: req.body.mobileNo,
			institute: req.body.institute,
			gender: req.body.gender,
			image:image,
    	});

    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            return res.redirect("back");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/getUser");
        });
    });
});


//getUserId
router.get("/getUser",function(req,res){
	res.redirect("/show/"+req.user._id);
});

//Logout
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success", 'You have been successfully logged out');
	res.redirect("/");
});

router.get("/redirectlogin",function(req,res){
    req.flash("error",'Invalid Credentials');
    res.redirect("/login");
});


module.exports = router;