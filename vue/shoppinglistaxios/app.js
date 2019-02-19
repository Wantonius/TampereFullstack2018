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
		"itemtype":req.body.itemtype,
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

app.listen(3000);
console.log("Running in port 3000");