import { combineReducers } from 'redux';
import login from './login';
import error from './error';

export default combineReducers({
  login,
  error
});