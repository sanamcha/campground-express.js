var express = require("express");
var app = express();
var passport = require("passport");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var Comment =require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seed");


mongoose.connect("mongodb://localhost:27017/yelp-camp-v10" 
 ,{useUnifiedTopology: true,
 useNewUrlParser: true,										});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"))
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"This is my secret...",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

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

// =============
//COMMENTS ROUTES


app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	//find by id
	Campground.findById(req.params.id, function(err, campground){
	if(err){
		console.log(err);
	} else {
		res.render("comments/new", {campground: campground});
	}
	})
});


app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

//Auth Routes
// show register form
app.get("/register", function(req, res){
	res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res){
	var newUser = new User({username:req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//show login form
app.get("/login", function(req, res){
	res.render("login");
});
//handling login logic
// app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local",
	{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
	
}), function(req, res){
	
});
//logic route
app.get("/logout",function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});