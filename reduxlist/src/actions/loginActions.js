export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

//Actions

export const register = (user) => {
	console.log("loginActions -- register!!")
	return dispatch => {
		let registerObject = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loginLoading());
		fetch("/register", registerObject).then((response) => {
			if(response.ok) {
				dispatch(registerSuccess());
			} else {
				response.json().then((error) => {
					dispatch(registerFailed(error.message));
				}).catch((error) => {
					dispatch(registerFailed(error));
				})
			}		
		}).catch((error) => {
			dispatch(registerFailed(error));
		});
	}
}

export const login = (user) => {
	console.log("loginActions -- login!!")
	return dispatch => {
		let loginObject = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loginLoading());
		fetch("/login", loginObject).then((response) => {
			response.json().then((data) => {
				if(response.ok) {
					dispatch(loginSuccess(data.token))
				} else {
					dispatch(loginFailed(data.message))
				}
			}).catch((error) => {
				dispatch(loginFailed(error));	
			})
		}).catch((error) => {
			dispatch(loginFailed(error));
		});
	}
}

export const logout = (token) => {
	console.log("loginActions -- logout!!")
	return dispatch => {
		let logoutObject = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					 "token":token}
		}
		dispatch(loginLoading());
		fetch("/logout", logoutObject).then((response) => {
			if(response.ok) {
				dispatch(logoutSuccess());
			} else {
				response.json().then((error) => {
					dispatch(logoutFailed(error.message));
				}).catch((error) => {
					dispatch(logoutFailed(error));
				})
			}		
		}).catch((error) => {
			dispatch(logoutFailed(error));
		});
	}
}
//Creators

const loginLoading = () => {
	return {
		type:LOGIN_LOADING
	}
}

const loginSuccess = (token) => {
	return {
		type:LOGIN_SUCCESS,
		token:token
	}
}

const loginFailed = (error) => {
	return {
		type:LOGIN_FAILED,
		error:error
	}
}

const registerSuccess = () => {
	return {
		type:REGISTER_SUCCESS,
	}
}

const registerFailed = (error) => {
	return {
		type:REGISTER_FAILED,
		error:error
	}
}

const logoutSuccess = () => {
	return {
		type: LOGOUT_SUCCESS
	}
}

const logoutFailed = (error) => {
	return {
		type:LOGOUT_FAILED,
		error:error
	}
}
