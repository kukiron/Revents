import React from "react"
import { List, Image } from "semantic-ui-react"

const EventListAttendee = ({ attendee }) => (
  <List.Item>
    <Image as="a" size="mini" circular src={attendee.photoURL} />
  </List.Item>
)

export default EventListAttendee
