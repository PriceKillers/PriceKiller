import axios from 'axios';

/**** SIGNUP ACTIONS ****/
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export function requestSignup(creds) {
  return {
    type: SIGNUP_REQUEST,
    // isFetching: true,
    isAuthenticated: false,
    creds
  }
};

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export function receiveSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    isAuthenticated: true,
    user: user
  }
};

export const  SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    isAuthenticated: false,
    message
  }
};

/**** SIGNUP API CALL ****/
//Calls the API go get a token and dispatches along the way
export function signupUser(creds) {
  let header = {'Content-Type': 'application/x-www-form-urlencoded'};
  return dispatch => {
    dispatch(requestSignup(creds));
    axios.post('/api/auth/signup', {username: creds.username, password: creds.password})
    .then(res => {
      // console.log('signup res in action', res);
        dispatch(receiveSignup(res.data));
      // }
    }).catch(err => {console.log('signup API public error', err)});
  }
}


/**** LOGIN ACTIONS ****/
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isAuthenticated: false,
    creds
  }
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true,
    user: user
  }
};

export const  LOGIN_FAILURE = 'LOGIN_FAILURE';
export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isAuthenticated: false,
    message
  }
};

/**** LOGIN API CALL ****/
//Calls the API go get a token and dispatches along the way
export function loginUser(creds) {
  let header = {'Content-Type': 'application/x-www-form-urlencoded'};
  return dispatch => {
    dispatch(requestLogin(creds));
    axios.post('/api/auth/login', {username: creds.username, password: creds.password})
    .then(res => {
      console.log('login res in action', res);
        dispatch(receiveLogin(res.data));
      // }
    }).catch(err => {console.log('signup API public error', err)});
  }
}


/**** LOGOUT ACTIONS ****/
//remove token from localStorage
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isAuthenticated: true
  }
};

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isAuthenticated: false
  }
};

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    dispatch(receiveLogout());
  }
};

/**** Lock ****/
export const SHOW_LOCK = 'SHOW_LOCK';
export function showLock() {
  return {
    type: SHOW_LOCK
  }
};

export const LOCK_SUCCESS = 'LOCK_SUCCESS';
export function lockSuccess(profile, token) {
  return {
    type: LOCK_SUCCESS,
    profile,
    token
  }
};

export const LOCK_ERROR = 'LOCK_ERROR';
export function lockError(err) {
  return {
    type: LOCK_ERROR,
    err
  }
};

/*
// console.log('auth id', process.env, 'auth domain', process.env.AUTH_DOMAIN)
// const lock = new Auth0Lock(process.env.AUTH_ID, process.env.AUTH_DOMAIN);
const lock = new Auth0Lock('FTYdG4IJsEBoitw1MRvFqxcd94F150Oq', 'pricekiller.auth0.com',
  {allowedConnections: ['Username-Password_Authentication', 'google-oauth2'],
  rememberLastLogin: false,
  socialButtonStyle: 'big',
  languageDictionary: {'title': 'Auth0'},
  language: 'en',
  theme: {}
  });
  */

export function login() {
  return dispatch => {
    // console.log('dispatch', dispatch)
    // lock.show();
  }
};

/*
export function doAuthentication() {
  return dispatch => {
    lock.on("authenticated", function(authResult) {
      lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) { return dispatch(lockError(error)); }
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', authResult.idToken);
        return dispatch(lockSuccess(profile))
      });
    });
  }
}
*/