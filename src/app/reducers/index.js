import { combineReducers } from "redux"
import testReducer from "../../features/testArea/testReducer"
import eventReducer from "../../features/events/eventReducer"

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer
})

export default rootReducer
