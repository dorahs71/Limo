import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import currentUserReducer from './currentUserReducer';
import activeStateReducer from './activeStateReducer';
import getAllUsersReducer from './getAllUsersReducer';

const reducers = combineReducers({
  search: searchReducer,
  currentUser: currentUserReducer,
  active: activeStateReducer,
  allUser: getAllUsersReducer,
});

export default reducers;
