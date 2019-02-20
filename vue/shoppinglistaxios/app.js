let express = require("express");
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

let database = [];
let id = 100;

app.get("/api/shoppinglist", function(req,res) {
	return res.status(200).json(database);
});

app.post("/api/shoppinglist", function(req,res) {
	let item = {
		"id":id,
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price
	}
	id++;
	database.push(item);
	return res.status(200).json({"message":"success"})
});

app.delete("/api/shoppinglist/:id", function(req,res) {
	let id = req.params.id;
	for(let i = 0;i<database.length;i++) {
		if(id == database[i].id) {
			database.splice(i,1);
			return res.status(200).json({"message":"success"});
		}
	}
	return res.status(404).json({"message":"not found"});
});

//Login API

let registeredUsers = [];
let loggedUsers = [];

app.post("/register", function(req,res) {
	let user = {
		"username":req.body.username,
		"password":req.body.password
	}
	registeredUsers.push(user);
	return res.status(200).json({"message":"success"});
});

app.post("/login", function(req,res) {
	for(let i=0;i<registeredUsers.length;i++) {
		if(registeredUsers[i].username == req.body.username) {
			if(registeredUsers[i].password == req.body.password) {
				let token = createToken();
				loggedUsers.push({
					"token":token,
					"username":req.body.username
				})
				return res.status(200).json({"token":token});
			}
		}
	}
	return res.status(403).json({"message":"not allowed"});
});

function createToken() {
	let letters = "abcdefghijABCDEFGHIJ0123456789";
	let token = "";
	for(let i=0;i<128;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token + letters[temp]
	}
	return token;
}

function isUserLogged(req,res,next) {
	for(let i=0;i<loggedUsers.length;i++) {
		if(req.headers.token == loggedUsers[i].token) {
			return next();
		}
	}
	return res.status(403).json({"message":"forbidden"});
}

app.use("/api",isUserLogged);
app.listen(3000);
console.log("Running in port 3000");