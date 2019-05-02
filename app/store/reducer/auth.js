import {
  SUCCESS_AUTH, AUTH_LOG_OUT
} from '../actionTypes'

const INITIAL_STATE = {
  error: null,
  auth: null,
  processing: false
}

export default function (state=INITIAL_STATE, action){
  switch(action.type) {
    case SUCCESS_AUTH:
      return { ...state, processing: false, error: null, auth: action.payload }
    case `${SUCCESS_AUTH}_SUCCESS`:
      return { ...state, processing: false, error: null, auth: action.payload }
    case `${SUCCESS_AUTH}_FAIL`:
      return { ...state, auth: null, processing: false, error: action.payload }

    case AUTH_LOG_OUT:
      return { ...state, processing: false, error: null, auth: null }

    default:
      return state
  }
}
