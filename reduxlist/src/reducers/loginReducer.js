import {
	LOGIN_LOADING,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED
} from '../actions/loginActions';


function getInitialState() {
	let initialState = {
		isLogged:false,
		token:"",
		loading:false,
		error:""
	}
	if(sessionStorage.getItem("login_state")) {
		initialState = JSON.parse(sessionStorage.getItem("login_state"));
	}
	return initialState;
}

const initialState = getInitialState();

function saveToStorage(state) {
	let string_state = JSON.stringify(state);
	sessionStorage.setItem("login_state",string_state);
}
const loginReducer = (state = initialState, action) => {
	console.log("LoginReducer: action type:"+action.type)
	let tempState = {}
	switch(action.type) {
		case LOGIN_LOADING:
			tempState = {
				...state,
				loading:true,
				error:""
			}
			return tempState
		case LOGIN_SUCCESS:
			tempState = {
				loading:false,
				error:"",
				isLogged:true,
				token:action.token
			}
			saveToStorage(tempState);
			return tempState;
		case LOGIN_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case REGISTER_SUCCESS:
			tempState = {
				...state,
				loading:false,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case REGISTER_FAILED: 
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case LOGOUT_SUCCESS:
			tempState = {
				...state,
				loading:false,
				error:"",
				token:"",
				isLogged:false
			}
			sessionStorage.clear();
			return tempState;
		case LOGOUT_FAILED:
			tempState = {
				...state,
				loading:false,
				error:action.error
		}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}

}

export default loginReducer;