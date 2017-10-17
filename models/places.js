var mongoose=require("mongoose");   
var placesSchema=new mongoose.Schema({
   title:String,
   img:String,
   description:String,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
   comments:[
       {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Comments"
       }
   ]

});

module.exports=mongoose.model("Places",placesSchema);