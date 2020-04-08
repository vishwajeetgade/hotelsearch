var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    hotels      = require("./models/hotels"),
    Comment    = require("./models/commets"),
    passport   = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    User       = require("./models/users");


var indexRoutes = require("./routes/index"),
    hotelsRoutes = require("./routes/hotels"),
    commentRoutes = require("./routes/comment");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://vishu:1433@hotel-rating-shard-00-00-l6dhv.gcp.mongodb.net:27017,hotel-rating-shard-00-01-l6dhv.gcp.mongodb.net:27017,hotel-rating-shard-00-02-l6dhv.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Hotel-Rating-shard-0&authSource=admin&retryWrites=true&w=majority");
/*mongoose.connect("mongodb://localhost/HotelSearch");*/

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( __dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
//seedsDB();

app.use(require("express-session")({
	secret: "I Love",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.get("/", function(req, res){
    res.render("landing");
});

app.use(indexRoutes);
app.use("/hotels",hotelsRoutes);
app.use("/hotels/:id/comment", commentRoutes);



app.listen(8080, function(){
    console.log("Hotels Server Activated");
});