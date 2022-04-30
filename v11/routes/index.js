var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


//Root routes
router.get("/", function(req, res){
	res.render("landing");
});


//Auth Routes
// show register form
router.get("/register", function(req, res){
	res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username:req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);//instead of err.message we can write any error message.
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success","Welcome to YelpCamp- " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local",
	{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
	
}), function(req, res){
	
});
//logout route
router.get("/logout",function(req, res){
	req.logout();
	req.flash("success","Loggod you out");
	res.redirect("/");
});


module.exports = router;