/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const state = {
	shoppingList:[],
	isLogged:false,
	token:""
}

const mutations = {
	changeList:function(state,list) {
		state.shoppingList = list
	},
	login:function(state,token) {
		state.isLogged = true;
		state.token=token
	}
}

const actions = {
	getList: function(context) {
		axios.get("/api/shoppinglist",{
			headers:{
				token:context.state.token
			}
		}).then(function(res){
			context.commit("changeList",res.data);			
		}).catch(function(error) {
			console.log(error.message);
		});		
	},
	addToList: function(context, item) {
		axios.post("/api/shoppinglist", item, {
			headers:{
				token:context.state.token
			}
		}).then(function(res) {
			if(res.status==200) {
				context.dispatch("getList");
			} else {
				console.log("POST new item. Server responded with:"+res.status)
			}
		}).catch(function(error) {
			console.log(error.message);
		})
	},
	removeFromList: function(context, id) {
		axios.delete("/api/shoppinglist/"+id,{
			headers:{
				token:context.state.token
			}
		}).then(function(res) {
			if(res.status===200) {
				context.dispatch("getList");
			} else {
				console.log("Server responded with status:"+res.status);
			}
		}).catch(function(error) {
			if(error.response.status===404) {
				alert("Not found");
				context.dispatch("getList");
			} else {
				console.log(error.message);
			}
		});
	},
	login:function(context, user) {
		axios.post("/login",user).then(function(res) {
			if(res.status == 200) {
				context.commit("login",res.data.token);
			} else {
				console.log("Server responded with status:"+res.status)
			}
		}).catch(function(error) {
			if(error.response.status === 403) {
				alert("Wrong credentials");
			}
		})
	},
	register:function(context,user) {
		axios.post("/register",user).then(function(res) {
			if(res.status == 200) {
				alert("Register success");
			}
		}).catch(function(error) {
			console.log(error.message);
		})
	}
}

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations,
	actions
});		