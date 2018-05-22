import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./eventConstants"
import { createReducer } from "../../app/common/utils/reducerUtil"
import initialState from "./eventData"

const createEvent = (state, payload) => [
  ...state,
  Object.assign({}, payload.event)
]

const updateEvent = (state, payload) => [
  ...state.filter(event => event.id !== payload.event.id),
  Object.assign({}, payload.event)
]

const deleteEvent = (state, payload) => [
  ...state.filter(event => event.id !== payload.eventId)
]

export default createReducer(initialState, {
  [CREATE_EVENT]: createEvent,
  [UPDATE_EVENT]: updateEvent,
  [DELETE_EVENT]: deleteEvent
})
