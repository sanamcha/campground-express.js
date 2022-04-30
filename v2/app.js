var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/yelp-camp-v10", {useUnifiedTopology: true,
useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");


var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String
});
var campground = mongoose.model("campground",campgroundSchema);


// campground.create(
// {
// 	name:"Hill",
// 	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs6w4ITltaEFMohxYALKKCiguqBqd3BXWNJbrWmHSXOEArLeBVCA&s"
	
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED CAMPGROUND");
// 		console.log(campground);
// 	}
// });

// var campgrounds = [
// 		{name:"Hill", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs6w4ITltaEFMohxYALKKCiguqBqd3BXWNJbrWmHSXOEArLeBVCA&s"},
// 		{name:"River", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRiv5AvHcvNp5liE2rMFUd0UNxZIGohQimDV35HTk4YgqZbAXcoA&s"},
// 		{name:"House", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnLbOImxnAqmEgGPSHogfcYbN4XpcFC36gfJBZSS3nUcemb2Y1&s"},
// 		{name:"Mountain", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8d5E_CgccEL9H-c6UdcY4gBBecDwA4M-jsUl7KbmobF5dNdrb&s"},
// 		{name:"Animal", image:"https://media.nature.com/w800/magazine-assets/d41586-019-02978-7/d41586-019-02978-7_17231532.jpg"},
// 		{name:"Nature", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGJQu0wkvNtKRQhFlz3Oarg_r52qYl7tBXInp0Z-hJYr7BukhcrA&s"}
// 	];

app.get("/", function(req, res){
	res.render("landing");
});
app.get("/campgrounds", function(req, res){
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
});
	

app.post("/campgrounds", function(req, res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image}
	//create a new campground and save to DB
	campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campground page
	res.redirect("/campgrounds");
		}
	});
});
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
});


app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});