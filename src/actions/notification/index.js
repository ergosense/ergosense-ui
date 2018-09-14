export const NOTIFICATION = 'action-notify';
export const NOTIFICATION_DISMISS = 'action-notify-dismiss';
export const SUCCESS = 'success';
export const ERROR = 'error';

export default {
  success: (content) => {
    return {
      type: NOTIFICATION,
      payload: { type: SUCCESS, message: content }
    }
  },
  error: (content) => {
    return {
      type: NOTIFICATION,
      payload: { type: ERROR, message: content }
    }
  },
  dismiss: () => {
    return {
      type: NOTIFICATION_DISMISS
    }
  }
};