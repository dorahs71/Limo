import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import currentUserReducer from './currentUserReducer';

const reducers = combineReducers({
  search: searchReducer,
  currentUser: currentUserReducer,
});

export default reducers;
