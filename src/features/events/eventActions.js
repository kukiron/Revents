import { toastr } from "react-redux-toastr"

import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS
} from "./eventConstants"
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions"
import { fetchEventData } from "../../app/data/mockApi"

const fetchEvents = events => ({
  type: FETCH_EVENTS,
  payload: events
})

export const createEvent = event => async dispatch => {
  try {
    dispatch({
      type: CREATE_EVENT,
      payload: { event }
    })
    toastr.success("Success!", "Event successfully created")
  } catch (err) {
    console.log(err)
    toastr.error("Oops!", "Something went wrong")
  }
}

export const updateEvent = event => async dispatch => {
  try {
    dispatch({
      type: UPDATE_EVENT,
      payload: { event }
    })
    toastr.success("Success!", "Event has been updated")
  } catch (err) {
    console.log(err)
    toastr.error("Oops!", "Something went wrong")
  }
}

export const deleteEvent = eventId => ({
  type: DELETE_EVENT,
  payload: { eventId }
})

export const loadEvents = () => async dispatch => {
  try {
    dispatch(asyncActionStart())
    let events = await fetchEventData()
    dispatch(fetchEvents(events))
    dispatch(asyncActionFinish())
  } catch (err) {
    console.log(err)
    dispatch(asyncActionError())
  }
}
