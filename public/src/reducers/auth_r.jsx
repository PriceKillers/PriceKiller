// import { combineReducers } from 'redux'
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILIURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS} from '../actions/auth_a.jsx';

function auth(state ={}, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: action.creds
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: ''
      })
    case SIGNUP_FAILIURE:
      return Object.assign({}, state, {
        // isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        // isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        // isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        // isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        // isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
};

export default auth;