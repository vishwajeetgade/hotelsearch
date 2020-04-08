
var express = require("express");
var router  = express.Router({mergeParams: true});
var hotels   = require("../models/hotels");
var Comment   = require("../models/commets");



router.post("/new", isLoggedIn,  function(req, res){
	hotels.findById(req.params.id, function(err, hotel){
		if (err) {
			console.log(err);
		} else{
			Comment.create(req.body.comments, function(err, newComment){
				if (err) {
					console.log(err);
				} else{
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					hotel.comments.push(newComment);
					hotel.save();
					res.redirect("/hotels/" + req.params.id);
				}
			});
		}
	});
});

router.put("/:comment_id", function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, function(err, foundHotels){
		if (err) {
			res.redirect("/hotels");
		}else{
			res.redirect("/hotels/" + req.params.id);
		}
	}); 
});

router.delete("/:comment_id", function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err, removeComment){
		if (err) {
			res.redirect("/hotels/"+ req.param.id);
		}else{
			res.redirect("/hotels/"+ req.param.id);
		}
	});
    
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;