var express = require("express");
var router  = express.Router();//(instead of app we using router)
var Campground = require("../models/campground");

//Index Routes
router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});
	
//Create Routes
router.post("/", function(req, res){
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

// NEW Route
router.get("/new", function(req, res){
	res.render("campgrounds/new");
});

//SHOW Route
router.get("/:id", function(req,res){
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


module.exports = router;