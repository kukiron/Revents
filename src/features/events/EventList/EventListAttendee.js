import React from "react"
import { Link } from "react-router-dom"
import { List, Image } from "semantic-ui-react"

const EventListAttendee = ({ attendee }) => (
  <List.Item>
    <Image
      as={Link}
      to={`/profile/${attendee.id}`}
      size="mini"
      circular
      src={attendee.photoURL}
    />
  </List.Item>
)

export default EventListAttendee
