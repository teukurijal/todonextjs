import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducer';

const composeMiddlewares = applyMiddleware(
  thunkMiddleware
);

export default initialState => createStore(
  reducers,
  initialState,
  composeWithDevTools({ name: 'todos' })(composeMiddlewares),
);