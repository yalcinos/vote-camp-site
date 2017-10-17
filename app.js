var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/users.js"),
    seedDB = require("./seed.js");

var commentsRoutes = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/vote_places",{useMongoClient: true});    
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
// dirname is the whole directory path Ex:/home/yalcin/find-awesome-places
app.use(express.static(__dirname+"/public"));
// seedDB();

//------------------PASSPORT MODULE CONFIGURATION-------------------------------
app.use(require("express-session")({
    secret:"voteplace",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
//authentication method is defined by passportlocalmongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//--------------END PASSPORT CONFIGURATION------------------------

//MIDDLEWARE-- RUNS ALL ROUTES
app.use(function (req,res,next) {
    res.locals.currentuser=req.user;
    next();
});
app.use(indexRoutes);
//Routeların herbiri campgrounds ile başladıgı için bu şekilde tanımladım dolasıyla campgroundsjs tekı "campgrounds" öneklerine gerek yok.
app.use("/campgrounds",campgroundsRoutes);
app.use(commentsRoutes);


app.listen(3001,function(){
	console.log("Server has started.");
});