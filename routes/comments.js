var express = require("express");
var router = express.Router();
var Places = require("../models/places");
var Comments = require("../models/comments");

//-----------------COMMENTS ROUTE--------------------
router.get("/campgrounds/:id/comments/new",isLoggedIn,function (req,res) {
    Places.findById(req.params.id,function (err,comment) {
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{places:comment});
        }
    });

});
//---------------ADD NEW COMMENT TO DB--------------------
router.post("/campgrounds/:id/comments",isLoggedIn,function (req,res) {
    Places.findById(req.params.id,function (err,place) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comments.create(req.body.comment,function (err,comment) {
                if(err){
                    console.log(err);
                }else{
                    place.comments.push(comment);
                    place.save();
                    res.redirect("/campgrounds/"+place._id);
                }
            })
        }
    })
});

//middleware
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}
module.exports=router;