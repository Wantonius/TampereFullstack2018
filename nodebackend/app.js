const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

//database

let shoppingList = [];
let id = 100;
// FILTER


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

app.listen(3001);
console.log("Running in port 3001");