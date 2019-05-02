import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { SAMPLE_ACTION } from '../actionTypes'


function reqSampleAction() {
  let url = 'https://jsonplaceholder.typicode.com/todos'
  return axios.get(url)
}

export function* sampleSagaFunc(action) {
  try {
    let response = yield call(reqSampleAction)
    yield put({ type: `${SAMPLE_ACTION}_SUCCESS`, payload: response.data })
  } catch(e) {
    yield put({ type: `${SAMPLE_ACTION}_FAIL`, payload: e.response })
  }
}
