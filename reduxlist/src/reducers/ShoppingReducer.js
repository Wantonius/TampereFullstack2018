import * as shoppingAction from '../actions/shoppingActions'


function getInitialState() {
	let initialState = {
		list:[],
		loading:false,
		error:""
	}
	if(sessionStorage.getItem("shopping_state")) {
		initialState = JSON.parse(sessionStorage.getItem("shopping_state"));
	}
	return initialState;
}

const initialState = getInitialState();

function saveToStorage(state) {
	let string_state = JSON.stringify(state);
	sessionStorage.setItem("shopping_state",string_state);
}

const shoppingReducer = (state = initialState, action) => {
	console.log("ShoppingReducer: action:"+action.type)
	console.log(state);
	let tempState = {};
	switch(action.type) {
		case shoppingAction.LIST_LOADING:
			tempState = {
				...state,
				loading:true,
				error:""
			}
			return tempState;
		case shoppingAction.GET_LIST_SUCCESS:
			tempState= {
				loading:false,
				error:"",
				list:action.list
			}
			saveToStorage(tempState);
			return tempState;
		case shoppingAction.GET_LIST_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case shoppingAction.ADD_TO_LIST_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			return tempState;
		case shoppingAction.ADD_TO_LIST_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case shoppingAction.DELETE_FROM_LIST_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			return tempState;
		case shoppingAction.DELETE_FROM_LIST_FAILED:
			tempState = {
				...state,
				error:action.error,
				loading:false
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default shoppingReducer;