import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import currentUserReducer from './currentUserReducer';
import keywordReducer from './keywordReducer';

const reducers = combineReducers({
  search: searchReducer,
  currentUser: currentUserReducer,
  keyword: keywordReducer,
});

export default reducers;
