var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    Places=require("./models/places.js"),
    Comments=require("./models/comments.js"),
    User=require("./models/users.js"),
    seedDB=require("./seed.js")


mongoose.connect("mongodb://localhost/vote_places",{useMongoClient: true});    
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
// dirname is the whole directory path Ex:/home/yalcin/find-awesome-places
app.use(express.static(__dirname+"/public"));
seedDB();

//------------------PASSPORT CONFIGURATION-------------------------------
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

app.get("/",function(req,res){
	res.render("mainpage");
});

//-----------------INDEX-Show campgrounds---------------------
app.get("/campgrounds",function(req,res){
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

//--------------CREATE-add new campp to DB---------------------
app.post("/campgrounds",function(req,res){
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

//--------------NEW- show form to create new campgrounds--------------------
app.get("/campgrounds/new",function(req, res) {
    res.render("places/new.ejs");
});

//--------Show more info about campground.-------------------------
app.get("/campgrounds/:id",function(req, res) {
   
    Places.findById(req.params.id).populate("comments").exec(function(err,foundsPlaces){
       if(err){
           console.log(err);
       }else{
           console.log(foundsPlaces);
            res.render("places/show",{campingsite:foundsPlaces});
       } 
    });
});

//-----------------COMMENTS ROUTE--------------------
app.get("/campgrounds/:id/comments/new",function (req,res) {
    Places.findById(req.params.id,function (err,comment) {
       if(err){
           console.log(err);
       } else{
           res.render("comments/new",{places:comment});
       }
    });

});

//---------------ADD NEW COMMENT TO DB--------------------
app.post("/campgrounds/:id/comments",function (req,res) {
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

//-----------AUTHENTICATION ROUTE------------
app.get("/register",function (req,res) {
    
});
app.get("/login",function (req,res) {

});
app.listen(3001,function(){
	console.log("Server has started.");
});