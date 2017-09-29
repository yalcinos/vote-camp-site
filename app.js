var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/vote_places",{useMongoClient: true});    
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var placesSchema=new mongoose.Schema({
   name:String,
   img:String
});
var Places=mongoose.model("Places",placesSchema);

// Places.create(
//     {
//         name: "Granite Hill",
//         img: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
        
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

app.get("/campgrounds",function(req,res){
    Places.find({},function(err,place){
        if(err){
            console.log("Error is:"+err);
        }else{
            console.log("DATA FETCH SUCCESSFULLY!");
           	res.render("campgrounds",{campingsite:place});
        }
    });
});

app.get("/campgrounds/new",function(req, res) {
    res.render("new.ejs");
});

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

app.listen(process.env.PORT, process.env.IP,function(){
	console.log("Server has started.");
});