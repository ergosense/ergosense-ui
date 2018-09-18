import { workspaces } from './../../api/';
import { notification } from './../';

export const GET = 'workspaces-get';

export default {
  get: () => {
    return (dispatch) => {
      return workspaces.get()
        .then((res) => dispatch({ type: GET, payload: res }))
        .catch((err) => dispatch(notification.error(err.message)));
    }
  }
};