var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment   = require("./models/comment");


var data = [
 		{name:"River", 
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRiv5AvHcvNp5liE2rMFUd0UNxZIGohQimDV35HTk4YgqZbAXcoA&s",
		 desc:"This is a beautiful River."
		},
 		{name:"House", 
		 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnLbOImxnAqmEgGPSHogfcYbN4XpcFC36gfJBZSS3nUcemb2Y1&s",
		desc:"I might buy this house." 
		},
		{name:"Mountain", 
		 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8d5E_CgccEL9H-c6UdcY4gBBecDwA4M-jsUl7KbmobF5dNdrb&s",
		desc:" Wow, what a wonderful Mountain."
		},
]
 
function seedDB(){
	//remove all campgrounds
	campground.deleteMany({}, function(err){
		if(err){
		  console.log(err);	
		}
		console.log("removed campgrounds!");
	comment.deleteMany({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed comment");
	
	
	//add a few campgrounds
	data.forEach(function(seed){
		campground.create(seed, function(err, data){
			if(err){
				console.log(err)
			} else {
				console.log("added a campground");
				
	//create a comment
			comment.create(
				{
					text:"This is just a comment.",
					author:"Sanam"
				}, function(err, comment){
				if(err){
					console.log(err);
				} else {
					// campground.comments.push(comment);
					// campground.save();
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
	
				  