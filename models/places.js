var mongoose=require("mongoose");   
var placesSchema=new mongoose.Schema({
   name:String,
   img:String,
   description:String
});

module.exports=mongoose.model("Places",placesSchema);