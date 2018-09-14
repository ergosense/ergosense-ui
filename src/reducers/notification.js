/*
 | Notification
 | ------------
 | This reducer will listen for any "notifications"
 | from the app and populate the state appropriately.
 */
import { NOTIFICATION, NOTIFICATION_DISMISS } from './../actions/notification';
import moment from 'moment';

const current = (state) => {
  return current.notifications || {};
};

export default (state = {}, action) => {
  switch (action.type) {
    // Add a new notification to the state
    case NOTIFICATION:
      return { ...state, notification: action.payload };

    // Remove an existing notification from
    // the state.
    case NOTIFICATION_DISMISS:
      return { ...state, notification: null };
    default:
      return state;
  }
}