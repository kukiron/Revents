import eventData from "./eventData"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const fetchEventData = () =>
  delay(1000).then(() => Promise.resolve(eventData))
