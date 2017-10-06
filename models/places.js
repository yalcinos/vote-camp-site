var mongoose=require("mongoose");   
var placesSchema=new mongoose.Schema({
   title:String,
   img:String,
   description:String,
   comments:[
       {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Comments"
       }
   ]
});

module.exports=mongoose.model("Places",placesSchema);