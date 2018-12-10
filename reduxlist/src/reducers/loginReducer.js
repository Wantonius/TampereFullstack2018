import {
	LOGIN_LOADING,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED
} from '../actions/loginActions';

const initialState = {
	isLogged:false,
	token:"",
	loading:false,
	error:""
}

const loginReducer = (state = initialState, action) => {
	console.log("LoginReducer: action type:"+action.type)
	let tempState = {...state}
	switch(action.type) {
		case LOGIN_LOADING:
			tempState = {
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
			return tempState
		case LOGIN_FAILED:
			tempState = {
				loading:false,
				error:action.error
			}
			return tempState;
		case REGISTER_SUCCESS:
			tempState = {
				loading:false,
				error:""
			}
			return tempState;
		case REGISTER_FAILED: 
			tempState = {
				loading:false,
				error:action.error
			}
			return tempState;
		case LOGOUT_SUCCESS:
			tempState = {
				loading:false,
				error:"",
				token:"",
				isLogged:false
			}
			return tempState;
		case LOGOUT_FAILED:
			tempState = {
				loading:false,
				error:action.error
		}
			return tempState;
		default:
			return state;
	}

}

export default loginReducer;