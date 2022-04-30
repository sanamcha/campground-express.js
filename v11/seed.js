var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");


var data = [
		// {name:"River", 
		// image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRiv5AvHcvNp5liE2rMFUd0UNxZIGohQimDV35HTk4YgqZbAXcoA&s",
		//  desc:"This is a beautiful River."
		// },
		// {name:"House", 
		 
		//  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnLbOImxnAqmEgGPSHogfcYbN4XpcFC36gfJBZSS3nUcemb2Y1&s",
		//  desc:"I might buy this house."
		 
		// },
		// {name:"Mountain", 
		//  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8d5E_CgccEL9H-c6UdcY4gBBecDwA4M-jsUl7KbmobF5dNdrb&s",
		// desc:" Wow, what a wonderful Mountain."},
		
		// {name:"Butterfly", 
		// image:"https://image.shutterstock.com/image-photo/relaxing-nature-meadow-sun-rays-260nw-1039626550.jpg",
		// desc:" Butterfly with Red flower."},
		 
		//  {name:"Bird", 
		// image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6YIvIQfM3ELxqRh3Q2Ap_1FjJT8ogwy-JAQ&usqp=CAU",
		// desc:" Looks like this is not a sparrow."},
		
		// {name:"Sanamcha", 
		// image:"https://media-exp1.licdn.com/dms/image/C5103AQFTEfN3P9Kdxg/profile-displayphoto-shrink_200_200/0?e=1598486400&v=beta&t=12TIwsTLthgl-c9Xi0S5qHLOBypdQLLnhw16fjr1UQ0",
		// desc:" This is still me."},
		
]
 
function seedDB(){
//remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err){
		  console.log(err);	
		}
		console.log("removed campgrounds!");
	Comment.deleteMany({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed comment");
	
	
// add a few campgrounds
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err){
				console.log(err)
			} else {
				console.log("added a campground");
				
// create a comment
			Comment.create(
				{
					text:"This is just a comment.",
					author:"Sanam"
				}, function(err, comment){
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					console.log("Created new comment");
				}
			});			
			}
		});
		});	
	});	
	
	});
 }
					  
 module.exports = seedDB;
	
				  