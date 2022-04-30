
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// all the middleware goes here

var middlewareObj={};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
	if(err){
		res.redirect("back");
	} else {
		//does user own the campgrounds?
		if(foundCampground.author.id.equals(req.user._id)){
			next();
		} else {
		res.redirect("back");
		}	
	  } 
	});
	} else{
		res.redirect("back");
	}
}

//middleware for comments authorization
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
	if(err){
		res.redirect("back");
	} else {
		//does user own the campgrounds?
		if(foundComment.author.id.equals(req.user._id)){
			next();
		} else {
		res.redirect("back");
		}	
	  } 
	});
	} else{
		res.redirect("back");
	}
}	
//middleware for log in
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = middlewareObj;
