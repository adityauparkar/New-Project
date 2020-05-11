import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import ResultsReducer from './ResultsReducer'

const rootReducer = combineReducers({
  user: UserReducer,
  result: ResultsReducer
})

export default rootReducer
