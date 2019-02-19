import Vue from 'vue';
import Vuex from 'vuex';

const state = {
	shoppingList:[],
	id:100
}

const mutations = {
	addToList: function(state, item) {
		item.id = state.id;
		state.shoppingList.push(item);
		state.id++;
	},
	removeFromList: function(state, index) {
		state.shoppingList.splice(index,1);
	}
}

const actions = {
	addToList: function(context, item) {
		context.commit("addToList",item);
	},
	removeFromList: function(context, index) {
		context.commit("removeFromList", index);
	}
}

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations,
	actions
});		