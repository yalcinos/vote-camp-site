var mongoose=require("mongoose");
var Places=require("./models/places.js");
var Comments=require("./models/comments.js");
function seedDB() {
    var data=[
        {
            title:"Historical Place 1",
            img:"https://farm2.staticflickr.com/1616/25936335344_5ba498ba15.jpg",
            description:"blah blah blah"
        },
        {
            title:"Historical Place 2",
            img:"https://farm4.staticflickr.com/3172/2355138562_faaf7222dc.jpg",
            description:"blah blah blah"
        },
        {
            title:"Historical Place 3",
            img:"https://farm3.staticflickr.com/2041/32459432790_03606aa61a.jpg",
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