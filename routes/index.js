var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/users");

//Root route
router.get("/",function(req,res){
    res.render("mainpage");
});

//Register route
router.get("/register",function (req,res) {
    res.render("register");
});
//Register logic
router.post("/register",function (req,res) {
    var username=req.body.username;
    var password=req.body.password;
    User.register({username:username},password,function (err) {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function () {
            res.redirect("/campgrounds");
        })
    })
});
//Show login form
router.get("/login",function (req,res) {
    res.render("login");
});
//Login logic (Midddleware)
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res) {

});
//Logout route
router.get("/logout",function (req,res) {
    req.logout();
    res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

module.exports = router;