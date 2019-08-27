var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    User             = require("./models/user"),
    flash            = require("connect-flash");

require('dotenv').config();

var url = process.env.DATABASEURL || 'mongodb://localhost:27017/saprkTest'

mongoose.connect(url, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));



//PASSPORT CONFIGURATION   
app.use(require("express-session")({
    secret:"That's what i do i drink and i know things",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//requiring routes
var forgotRoutes    = require("./routes/forgot"),
    userRoutes      = require("./routes/users"),
    indexRoutes     = require("./routes/index")

app.use("/", indexRoutes);
app.use("/", userRoutes);
app.use("/", forgotRoutes);

//Server
app.listen(process.env.PORT, process.env.IP,function(){
	console.log("Server started");
});