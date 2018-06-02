import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from "./asyncConstants"

export const asyncActionStart = () => ({
  type: ASYNC_ACTION_START
})

export const asyncActionFinish = () => ({
  type: ASYNC_ACTION_FINISH
})

export const asyncActionError = () => ({
  type: ASYNC_ACTION_ERROR
})
