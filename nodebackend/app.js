const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;	

let app = express();

app.use(bodyParser.json());

//DATABASE CONNECTION

mongoose.connect("mongodb://localhost/tampereshopping").then(
	() => console.log("MongoDB connection successful"),
	(error) => console.log("MongoDB connection failed:"+error)
)

//SESSION MANAGER

app.use(session({
	name:"tampere-shopping",
	resave:false,
	secret:"myBestSecret",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60*24},
	store: new mongoStore({
		collection:"session",
		url:"mongodb://localhost/tampereshoppingsession",
		ttl:60*60*24
	})
}));

//PASSPORT AUTHENTICATION SETUP

app.use(passport.initialize());
app.use(passport.session());

passport.use("local-login", new localStrategy({
	usernameField:"username",                
	passwordField:"password",
	passReqToCallback:true
}, function(req,username,password,done){
	if(!req.body.username || !req.body.password) {
		return done(null,false,"Provide credentials");
	}
	userModel.findOne({"username":username}, function(err,user) {
		if(err) {
			return done(null,false,"Wrong credentials");
		}
		if(!user) {
			return done(null,false,"Wrong credentials");
		}
		if(user.password === password) {
			return done(null,user);
		}
		return done(null,false,"Wrong credentials");
	});
}));

passport.serializeUser(function(user,done) {
	done(null,user._id);
});

passport.deserializeUser(function(id, done) {
	userModel.findById(id,function(err,user) {
		if(err) {
			return done(err);
		}
		if(!user) {
			return done(null,false);
		} 
		done(null,user);
	});
});
//database

let shoppingList = [];
let id = 100;


// FILTER


app.use("/api", function(req,res,next) {
	if(req.isAuthenticated()) {
			return next();
	}
	return res.status(403).json({"message":"forbidden"});
})



// SHOPPING API

app.get("/api/shopping",function(req,res) {
	res.status(200).json(shoppingList);
});

app.post("/api/shopping", function(req,res) {
	let item = {
		"id":id,
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price
	}
	id++;
	shoppingList.push(item);
	res.status(200).json({"message":"success!"});
});

app.delete("/api/shopping/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<shoppingList.length;i++) {
		if(shoppingList[i].id === tempId) {
			shoppingList.splice(i,1);
			return res.status(200).json({"message":"success!"});
		}
	}
	res.status(404).json({"message":"not found"});
});

// LOGIN API
// /login
// /register
// /logout

app.post("/register", function(req,res) {
	if(!req.body.password || !req.body.username) {
		return res.status(409).json({"message":"Please provide credentials"});
	}
	if(req.body.password.length === 0 || req.body.username.length === 0) {
		return res.status(409).json({"message":"Please provide credentials"});		
	}
	let user = new userModel({
		"username":req.body.username,
		"password":req.body.password
	})
	user.save(function(err, item) {
		if(err) {
			return res.status(409).json({"message":"Username already in use"});				
		}
		if(!item) {
			return res.status(409).json({"message":"Username already in use"});			
		}
		return res.status(200).json({"message":"success"})	
	})
});

app.post("/login", passport.authenticate("local-login", {failureRedirect:"/"}), function(req,res)  {
	res.status(200).json({"message":"success"});
})

app.post("/logout", function(req,res) {
	if(req.session) {
		req.session.destroy();
		return res.status(200).json({"message":"success"});
	}
	return res.status(404).json({"message":"not found"});
});

app.listen(3001);
console.log("Running in port 3001");