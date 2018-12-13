export const LIST_LOADING = "LIST_LOADING";
export const GET_LIST_SUCCESS = "GET_LIST_SUCCESS";
export const GET_LIST_FAILED = "GET_LIST_FAILED";
export const ADD_TO_LIST_SUCCESS = "ADD_TO_LIST_SUCCESS";
export const ADD_TO_LIST_FAILED = "ADD_TO_LIST_FAILED";
export const DELETE_FROM_LIST_SUCCESS = "DELETE_FROM_LIST_SUCCESS";
export const DELETE_FROM_LIST_FAILED = "DELETE_FROM_LIST_FAILED";


// Actions

export const getList = (token) => {
	return dispatch => {
		let getListObject = {
			method:"GET",
			mode:"cors",
			credentials:"include",
			headers:{"Content-Type":"application/json",
					 "token":token}
		}
		dispatch(listLoading());
		fetch("/api/shopping",getListObject).then((response) => {
			response.json().then((data) => {
				if(response.ok) {
					dispatch(getListSuccess(data));
				} else {
					dispatch(getListFailed(data.message));
				}
			}).catch((error) => {
				dispatch(getListFailed(error));
			})
		}).catch((error) => {
			dispatch(getListFailed(error));
		})
	}

}

export const addToList = (token,item) => {
	return dispatch => {
		let addToListObject = {
			method:"POST",
			mode:"cors",
			credentials:"include",
			headers:{"Content-Type":"application/json",
					 "token":token},
			body:JSON.stringify(item)
		}
		dispatch(listLoading());
		fetch("/api/shopping", addToListObject).then((response) => {
			if(response.ok) {
				dispatch(addToListSuccess());
				dispatch(getList(token));
			} else {
				response.json().then((data) => {
					dispatch(addToListFailed(data.message));
				}).catch((error) => {
					dispatch(addToListFailed(error));
				})
			}
		}).catch((error) => {
			dispatch(addToListFailed(error));
		})
	}
}

export const deleteFromList = (token,id) => {
	return dispatch => {
		let deleteObject = {
			method:"DELETE",
			mode:"cors",
			credentials:"include",
			headers:{"Content-Type":"application/json",
					 "token":token},
		}
		dispatch(listLoading());
		fetch("/api/shopping/"+id,deleteObject).then((response) => {
			if(response.ok) {
				dispatch(deleteFromListSuccess());
				dispatch(getList(token));
			} else {
				response.json().then((data) => {
					dispatch(deleteFromListFailed(data.message))
				}).catch((error) => {
					dispatch(deleteFromListFailed(error));
				});
			}
		}).catch((error) => {
			dispatch(deleteFromListFailed(error));
		});
	}
}

// Action Creators

const listLoading = () => {
	return {
		type:LIST_LOADING,
	}
}

const getListSuccess = (list) => {
	return {
		type:GET_LIST_SUCCESS,
		list:list
	}
}

const getListFailed = (error) => {
	return {
		type:GET_LIST_FAILED,
		error: error
	}
}

const addToListSuccess = () => {
	return {
		type:ADD_TO_LIST_SUCCESS
	}
}

const addToListFailed = (error) => {
	return {
		type:ADD_TO_LIST_FAILED,
		error: error	
	}
}

const deleteFromListSuccess = () => {
	return {
		type:DELETE_FROM_LIST_SUCCESS
	}
}

const deleteFromListFailed = (error) => {
	return {
		type:DELETE_FROM_LIST_FAILED,
		error: error
	}
}