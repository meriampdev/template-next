import {
  SAMPLE_ACTION
} from '../actionTypes'

const INITIAL_STATE = {
  error: null,
  response: [],
  processing: false
}

export default function (state=INITIAL_STATE, action){
  switch(action.type) {
    case SAMPLE_ACTION:
      return { ...state, processing: true, error: null, response: [] }
    case `${SAMPLE_ACTION}_SUCCESS`:
      return { ...state, processing: false, error: null, response: action.payload }
    case `${SAMPLE_ACTION}_FAIL`:
      return { ...state, response: [], processing: false, error: action.payload }

    default:
      return state
  }
}
