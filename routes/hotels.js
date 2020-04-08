
var express = require("express");
var router  = express.Router({mergeParams: true});
var hotels   = require("../models/hotels");



router.get("/", function(req, res){
    hotels.find({},function(err , hotel){
        if (err) {
            console.log(err);
        }
        else{
            res.render("hotels/hotels",{hotels: hotel, currentUser: req.user}); 
        }
    });   
});

router.get("/new", isLoggedIn, function(req, res){
    res.render("hotels/addhotels");
});

router.post("/", isLoggedIn, function(req, res){
    hotels.create(req.body.hotels, function(err , newHotels){
        if (err) {
            console.log(err);
        }
        else{
            newHotels.author.id = req.user._id;
            newHotels.author.username = req.user.username;
            newHotels.save();
            res.redirect("/hotels");
        }
    });    
});

router.get("/search", function(req, res){
    var location = req.query.search;
    hotels.find({location: location},function(err , hotel){
        if (err) {
            console.log(err);
        }
        else{
            res.render("hotels/hotels",{hotels: hotel, currentUser: req.user});        }
    });   
});

router.get("/new", isLoggedIn, function(req, res){
    res.render("hotels/addhotels");
});


router.get("/:id", function(req, res){
    hotels.findById(req.params.id).populate("comments").exec(function(err, foundHotels){
        if (err) {
            console.log(err);
        }else{
            res.render("hotels/show",{hotels: foundHotels, currentUser: req.user})
        }
    });
});

router.get("/:id/edit", function(req, res){
	hotels.findById(req.params.id, function(err, foundHotels){
		if (err) {
			res.redirect("/hotels");
		}else{
			res.render("hotels/edit", {hotels: foundHotels});
		}
	});
    
});

router.put("/:id", function(req, res){
	hotels.findByIdAndUpdate(req.params.id, req.body.hotels, function(err, foundHotels){
		if (err) {
			res.redirect("/hotels");
		}else{
			res.redirect("/hotels/" + req.params.id);
		}
	}); 
});

router.delete("/:id", function(req, res){
	hotels.findByIdAndRemove(req.params.id, function(err, foundHotels){
		if (err) {
			res.redirect("/hotels");
		}else{
			res.redirect("/hotels");
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