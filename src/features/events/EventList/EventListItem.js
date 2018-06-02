import React from "react"
import { Link } from "react-router-dom"
import format from "date-fns/format"
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react"

import EventListAttendee from "./EventListAttendee"
import { objToArr } from "../../../app/common/utils/helpers"

const EventListItem = ({ event, onDeleteEvent }) => {
  const {
    title,
    date,
    description,
    venue,
    hostPhotoURL,
    hostedBy,
    attendees,
    cancelled
  } = event

  const renderAttendees = () =>
    attendees &&
    objToArr(attendees).map(attendee => (
      <EventListAttendee key={attendee.id} attendee={attendee} />
    ))

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={hostPhotoURL} />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>
                {title}
              </Item.Header>
              <Item.Description>
                Hosted by{" "}
                <Link to={`/profile/${event.hostUid}`}>{hostedBy}</Link>
              </Item.Description>
              {cancelled && (
                <Label
                  style={{ top: -40 }}
                  color="red"
                  ribbon="right"
                  content="Event has been cancelled"
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(date, "dddd Do MMMM")} at{" "}
          {format(date, "HH:mm")} |
          <Icon name="marker" /> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>{renderAttendees()}</List>
      </Segment>
      <Segment clearing>
        <span>{description}</span>
        <Button
          as="a"
          color="red"
          floated="right"
          content="Delete"
          onClick={onDeleteEvent(event.id)}
        />
        <Button
          as={Link}
          to={`/event/${event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  )
}

export default EventListItem
