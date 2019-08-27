var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");


//show
router.get("/show/:userid",middleware.checkAccountOwnership, function(req,res){
	User.findById(req.params.userid,function(err,foundUser){
		if(err){
			console.error(err);
			req.flash("error",'Something Went Wrong!!');
			res.redirect("/");
		}else{
			res.render("show",{user:foundUser});
		}
	});
});

//edit
router.get("/edit/:userid",middleware.checkAccountOwnership,function(req,res){
	User.findById(req.params.userid,function(err,foundUser){
		if(err){
			console.error(err);
			req.flash("error",'Something Went Wrong!!');
			res.redirect("/");
		}else{
			res.render("edit",{user:foundUser});
		}
	});
});



router.put("/edit/:userid",middleware.checkAccountOwnership,function(req,res){

	var newData =  {
			username:req.body.username,
	      	firstName: req.body.firstName,
	      	lastName: req.body.lastName,
			email: req.body.email,
			mobileNo: req.body.mobileNo,
			institute: req.body.institute,
	};
	if(req.body.image!=""){
		newData.image = req.body.image;
	}
	User.findByIdAndUpdate(req.params.userid,  {$set: newData}, function(err,updatedAccount){
		if(err){
			console.log(err);
			req.flash("error", 'Something Went Wrong!');
			res.redirect("/show/"+req.params.userid);
		}else{
			req.flash("success","Succesfully Updated!");
			res.redirect("/show/"+req.params.userid);
		}
	});
});

//Delete Account
router.delete("/delete/:userid",middleware.checkAccountOwnership, function(req,res){
    req.logout();
    User.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            req.flash("error", 'Something Went Wrong!!');
            res.redirect("/show/"+req.params.id);
        }else{
            req.flash("success",'Account Deleted Successfully');
            res.redirect("/");
        }
    });
});


module.exports = router;