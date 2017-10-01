var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/vote_places",{useMongoClient: true});    
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var placesSchema=new mongoose.Schema({
   name:String,
   img:String,
   description:String
});
var Places=mongoose.model("Places",placesSchema);

// Places.create(
//     {
//         name: "Granite Hill",
//         img: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//         description: "The huge campgrounds in Toronto!"
        
//     },function(err,place){
//     if(err){
//         console.log("FAILED!");
//     }else{
//         console.log("Created Successful!");
//         console.log(place);
//     }
// });
	
app.get("/",function(req,res){
	res.render("mainpage");
});

//INDEX-Show campgrounds
app.get("/campgrounds",function(req,res){
    Places.find({},function(err,place){
        if(err){
            console.log("Error is:"+err);
        }else{
            console.log("DATA FETCH SUCCESSFULLY!");
            //place is collection name on MongoDB
            //campsite is a parametre to pass data to ejs
           	res.render("index",{campingsite:place});
        }
    });
});

//CREATE-add new campp to DB
app.post("/campgrounds",function(req,res){
	//get data form and add array.
	//redirect campground.
	var name=req.body.name;
	var img=req.body.img;
	var newPlaceObj={name:name,img:img};
	Places.create(newPlaceObj,function(err,newlyCreatedPlaces){
	    if(err){
	        console.log(err);
	    }else{
	        res.redirect("/campgrounds");
	    }
	});
});
//NEW- show form to create new campgrounds
app.get("/campgrounds/new",function(req, res) {
    res.render("new.ejs");
});
//Show more info about campground.
app.get("/campgrounds/:id",function(req, res) {
   
    Places.findById(req.params.id,function(err,foundsPlaces){
       if(err){
           console.log(err);
       }else{
            res.render("show",{campingsite:foundsPlaces});
       } 
    });
});

app.listen(process.env.PORT, process.env.IP,function(){
	console.log("Server has started.");
});