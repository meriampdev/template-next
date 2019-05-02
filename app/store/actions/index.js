import { SAMPLE_ACTION, SUCCESS_AUTH, AUTH_LOG_OUT } from '../actionTypes'

export function sampleAction() {
  return { type: SAMPLE_ACTION, payload: null }
}

export function successAuth(data) {
  return { type: SUCCESS_AUTH, payload: data }
}

export function authLogout(data) {
  return { type: AUTH_LOG_OUT, payload: data }
}
