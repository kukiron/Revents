import React from "react"
import EventListItem from "./EventListItem"

const EventList = ({ events, onDeleteEvent }) => (
  <div>
    {events.map(event => (
      <EventListItem
        key={event.id}
        event={event}
        onDeleteEvent={onDeleteEvent}
      />
    ))}
  </div>
)

export default EventList
