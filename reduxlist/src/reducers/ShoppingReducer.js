const initialState = {
	list:[],
	id:100
}

const shoppingReducer = (state = initialState, action) => {
	console.log("ShoppingReducer: action:"+action.type)
	let tempState = {...state};
	switch(action.type) {
		case "ADD_TO_LIST":
			action.item.id = state.id;
			let tempList = [];
			let tempId = state.id+1;
			for(let i=0;i<state.list.length;i++) {
				tempList.push(state.list[i])			
			}
			tempList.push(action.item);
			tempState = {
				list:tempList,
				id:tempId
			}
			return tempState;
		case "REMOVE_FROM_LIST":
			let tempId2 = parseInt(action.id,10);
			let tempList2 = [];
			for(let i=0;i<state.list.length;i++) {
				if(state.list[i].id !== tempId2) {
					tempList2.push(state.list[i]);
				}
			}
			tempState.list = tempList2;
			return tempState;
		default:
			return state;
	}
}

export default shoppingReducer;