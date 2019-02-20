import Vue from 'vue';
import Router from 'vue-router';
import ShoppingList from '@/components/ShoppingList';
import ShoppingForm from '@/components/ShoppingForm';

Vue.use(Router);

export default new Router({
	routes:[{
		path:"/",
		name:"ShoppingList",
		component:ShoppingList
	},{
		path:"/form",
		name:"ShoppingForm",
		component:ShoppingForm
	}]
});