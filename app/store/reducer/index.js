import { combineReducers } from 'redux'
import sample from './sample'
import auth from './auth'

const rootReducer = combineReducers({
  sample, auth
})

export default rootReducer
