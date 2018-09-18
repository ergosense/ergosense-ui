import { combineReducers } from 'redux';
import login from './login';
import error from './error';
import notification from './notification';
import workspaces from './workspaces';

export default combineReducers({
  login,
  error,
  notification,
  workspaces
});