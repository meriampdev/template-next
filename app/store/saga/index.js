/* global fetch */
import { SAMPLE_ACTION } from '../actionTypes'
import { all, takeLatest } from 'redux-saga/effects'

import { sampleSagaFunc } from './sampleSaga'

function * rootSaga () {
  yield all([
    takeLatest(SAMPLE_ACTION, sampleSagaFunc)
  ])
}

export default rootSaga
