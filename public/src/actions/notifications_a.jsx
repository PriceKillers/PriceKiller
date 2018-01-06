import axios from 'axios';

export const SET_NOTIFICATIONS_PREF = 'SET_NOTIFICATIONS_PREF';
export function setNotificationsPref(preference) {
  return { type: SET_NOTIFICATIONS_PREF, preference };
}

export function updateNotificationPref(preference, username) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: '/api/notifications/',
      data: {
        username,
        preference
      }
    })
      .then((response) => {
        dispatch(setNotificationsPref(preference));
        alert('Your preferences have been updated!');
      })
  }
}