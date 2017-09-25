var express=require("express");
var app=express();
app.set("view engine","ejs");

app.get("/hi",function(req,res){
	res.send("saddas");
});
app.listen(3000,function(){
	console.log("Hi");
});