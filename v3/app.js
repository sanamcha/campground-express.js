var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var campground = require("./models/campground");
var seedDB = require("./seed");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp-camp-v10", {useUnifiedTopology: true,
 useNewUrlParser: true,																});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


//  var campground = [
//  		{name:"River", 
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRiv5AvHcvNp5liE2rMFUd0UNxZIGohQimDV35HTk4YgqZbAXcoA&s",
// 		 desc:"This is a beautiful River."
// 		},
//  		{name:"House", 
// 		 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnLbOImxnAqmEgGPSHogfcYbN4XpcFC36gfJBZSS3nUcemb2Y1&s",
// 		desc:"I might buy this house." 
// 		},
// 		{name:"Mountain", 
// 		 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8d5E_CgccEL9H-c6UdcY4gBBecDwA4M-jsUl7KbmobF5dNdrb&s",
// 		desc:" Wow, what a wonderful Mountain."
// 		},
// ]
 
app.get("/", function(req, res){
	res.render("landing");
});
app.get("/campgrounds", function(req, res){
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});
	

app.post("/campgrounds", function(req, res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description:desc}
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
// NEW PAGE

app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
});

//SHOW PAGE
app.get("/campgrounds/:id", function(req,res){
	//find the campgrounds with provided id
	campground.findById(req.params.id, function(err, foundCampground){
	if (err){
		console.log(err);
	} else {
		console.log(foundCampground);
		res.render("campgrounds/show", {campground:foundCampground});
	}
  });
});

//COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", function(req, res){
	res.render("comments/new");
})


app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});