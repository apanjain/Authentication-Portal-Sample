var User = require("../models/user");

//all the middleware goes here

var middlewareObj = {};

middlewareObj.checkAccountOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        User.findById(req.params.userid,function(err,foundUser){
            if(err){
                res.redirect("/");
            }else{
                if(foundUser._id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "This is Not Your Account. Please Go back to your account");
                    res.redirect("/");
                }
            }
        });
    }else {
        req.flash("error","Please Log In first");
        res.redirect("/login");
    }
};

middlewareObj.isLoggedOut = function(req,res,next){
    if(req.isAuthenticated()){
        req.flash('error','You need to Log Out first!');
        res.redirect('back');
    }else{
        next();
    }
}

module.exports = middlewareObj