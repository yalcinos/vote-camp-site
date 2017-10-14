var express=require("express");
var router=express.Router();
var Places=require("../models/places");
//Index Route-Show all campgrounds
router.get("/",function(req,res){
    Places.find({},function(err,place){
        if(err){
            console.log("Error is:"+err);
        }else{
            console.log("DATA FETCH SUCCESSFULLY!");
            //place is collection name on MongoDB
            //campsite is a parametre to pass data to ejs
            res.render("places/index",{campingsite:place});
        }
    });
});

//CREATE-add new campp to DB
router.post("/",function(req,res){
    //get data form and add array.
    //redirect campground.
    var title=req.body.title;
    var img=req.body.img;
    var desc=req.body.description;
    var newPlaceObj={title:title,img:img,description:desc};
    Places.create(newPlaceObj,function(err,newlyCreatedPlaces){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW- show form to create new campgrounds
router.get("/new",function(req, res) {
    res.render("places/new.ejs");
});

//SHOW-shows more info about campground
router.get("/:id",function(req, res) {

    Places.findById(req.params.id).populate("comments").exec(function(err,foundsPlaces){
        if(err){
            console.log(err);
        }else{
            console.log(foundsPlaces);
            res.render("places/show",{campingsite:foundsPlaces});
        }
    });
});

module.exports=router;