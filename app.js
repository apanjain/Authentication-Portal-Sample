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


// mongoose setup

var dbHost = process.env.DB_HOST || 'localhost';
var dbName = process.env.DB_NAME;
var dbUser = process.env.DB_USERNAME;
var dbPass = process.env.DB_PASSWORD;
var dbPort = process.env.DB_PORT || "27017";

var url = "mongodb://" + dbUser + ":" + dbPass + "@" + dbHost + ":" + dbPort + "/" + dbName;

mongoose
    .connect(url, {useNewUrlParser: true})
    .then(() => console.log("Connected To Database"))
    .catch(err => console.error(err));

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
app.listen(process.env.PORT,function(){
    console.log(`Server started on PORT ${process.env.PORT}`);
    console.log(`Visit http://localhost:${process.env.PORT}`);
});