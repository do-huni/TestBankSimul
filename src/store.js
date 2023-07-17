import { configureStore, createSlice } from '@reduxjs/toolkit'

let postList = createSlice({
	name: 'postList',
	initialState: ['1'],
	reducers:{
		update(state, action){
			let returnVal = action.payload;
			return returnVal;
		}
	}
})

export let {update} = postList.actions;

export default configureStore({
  reducer: {
	  postList: postList.reducer,
  }
}) 