const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

//database

let shoppingList = [];
let id = 100;

// user database
let registeredUsers = [];
let loggedUsers = [];

// FILTER

function createToken() {
	let token = "";
	let tokenizer = "abcdefghijABCDEFGHIJ0123456789"
	for(let i=0;i<1024;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token+tokenizer[temp];
	}
	return token;
}

app.use("/api", function(req,res,next) {
	console.log("In /api filter, token:"+req.headers.token);
	let token = req.headers.token;
	for(let i=0;i<loggedUsers.length;i++) {
		if(token === loggedUsers[i].token) {
			return next();
		}
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
	let user = {
		"username":req.body.username,
		"password":req.body.password
	}
	for(let i=0; i< registeredUsers.length; i++) {
		if(user.username === registeredUsers[i].username) {
			return res.status(403).json({"message":"Username already in use"})
		}
	}
	registeredUsers.push(user);
	console.log(registeredUsers);
	res.status(200).json({"message":"success"})	
});

app.post("/login", function(req,res) {
	if(!req.body.password || !req.body.username) {
		return res.status(409).json({"message":"Please provide credentials"});
	}
	if(req.body.password.length === 0 || req.body.username.length === 0) {
		return res.status(409).json({"message":"Please provide credentials"});		
	}	
	let user = {
		"username":req.body.username,
		"password":req.body.password
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username){
			if(user.password === registeredUsers[i].password) {
				let token = createToken();
				loggedUsers.push({
					"username":user.username,
					"token":token
				})
				return res.status(200).json({"token":token});
			}
		}
	}
	res.status(403).json({"message":"Wrong username or password"});
})

app.post("/logout", function(req,res) {
	let token = req.headers.token;
	for(let i=0;i<loggedUsers.length;i++) {
		if(loggedUsers[i].token === token) {
			loggedUsers.splice(i,1);
			return res.status(200).json({"message":"success"})
		}
	}
	return res.status(404).json({"message":"not found"});
});

app.listen(3001);
console.log("Running in port 3001");