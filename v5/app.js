var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seed");
var Comment =require("./models/comment");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp-camp-v10" 
 // ,{useUnifiedTopology: true,
 // useNewUrlParser: true,																}
				);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))

app.get("/", function(req, res){
	res.render("landing");
});
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
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
	Campground.create(newCampground, function(err, newlyCreated){
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
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
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
	//find by id
	Campground.findById(req.params.id, function(err, campground){
	if(err){
		console.log(err);
	} else {
		res.render("comments/new", {campground: campground});
	}
	})
});


app.post("/campgrounds/:id/comments", function(req, res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
	if(err){
		console.log(err);
		res.redirect("/campgrounds");
	}	else {
		Comment.create(req.body.comment, function(err, comment){
		if(err){
			console.log(err);
		} else {
			campground.comments.push(comment);
			campground.save();
			res.redirect('/campgrounds/' + 	campground._id);
		}
		});
	}	
	
	});
});


app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});