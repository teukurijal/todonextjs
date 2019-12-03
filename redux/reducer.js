import { combineReducers } from "redux";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
}

//testing

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TODOS_REQUEST':
      return { ...state, isLoading: true };
    case 'TODOS_ADD':
      const newData = state.data
      newData.pop()
      newData.unshift(action.payload)

      return { ...state, data: newData, isLoading: false };
    case 'TODOS_DELETE':
      const newDatas = state.data.filter(e => e.title !== action.payload)

      return {...state, data: newDatas, isLoading: false};
    case 'TODOS_FULFILLED':
      return { ...state, data: action.payload, isLoading: false };
    case 'TODOS_FAILED':
      return { ...state, isError: true, isLoading: false };
    default:
      return state;
  }
}

export default combineReducers({
  todos: reducer,
});