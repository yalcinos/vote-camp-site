var mongoose=require("mongoose");
var Places=require("./models/places.js");
var Comments=require("./models/comments.js");
function seedDB() {
    var data=[
        {
            title:"CampGrounds 1",
            img:"http://www.photosforclass.com/download/3753652204",
            description:"blah blah blah"
        },
        {
            title:"CampGrounds 2",
            img:"https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg",
            description:"blah blah blah"
        },
        {
            title:"CampGrounds 3",
            image:"http://www.photosforclass.com/download/7930235502",
            description:"blah blah blah"
        }
    ];
    Places.remove({},function (err) {
        if(err){
            console.log(err);
        }
        console.log("Removed Successfully!");
        data.forEach(function (seed){
            Places.create(seed,function (err,places) {
                if(err){
                    console.log(err);
                }else{
                    console.log("Added Places Data!");
                    Comments.create({
                        text:"This is a comment!",
                        author:"Yalcinos"
                    },function (err,comment) {
                        if(err){
                            console.log(err);
                        }else{
                            places.comments.push(comment);
                            places.save();
                            console.log("Created New Comment!");
                        }
                    });
                }
            });
        })
    });
}
module.exports=seedDB;