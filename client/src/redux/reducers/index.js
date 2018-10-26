import { combineReducers } from 'redux';
import auth from './auth.reducer';
import error from './error.reducer';

export default combineReducers({
  auth: auth,
  error: error,
});