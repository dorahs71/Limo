import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import currentUserReducer from './currentUserReducer';
import activeStateReducer from './activeStateReducer';

const reducers = combineReducers({
  search: searchReducer,
  currentUser: currentUserReducer,
  active: activeStateReducer,
});

export default reducers;
