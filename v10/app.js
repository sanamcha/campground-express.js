var express       	      = require("express"),
    app             	  = express(),
    passport      		  = require("passport"),
    bodyParser    		  = require("body-parser"),
    mongoose       		  = require("mongoose"),
    LocalStrategy  		  = require("passport-local"),
	methodOverride        = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
	Campground     		  = require("./models/campground"),
    Comment         	  = require("./models/comment"),
    User           		  = require("./models/user"),
    seedDB         		  = require("./seed")

//Requiring Routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index")


mongoose.connect("mongodb://localhost:27017/yelp-camp-v10" 
 ,{useUnifiedTopology: true,
 useNewUrlParser: true,										});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
 //seedDB();// seed the database

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

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});