import React from "react"
import { Link } from "react-router-dom"
import { Segment, List, Item, Label } from "semantic-ui-react"

const renderAttendeeList = attendees =>
  attendees &&
  attendees.map(attendee => (
    <Item key={attendee.id} style={{ position: "relative" }}>
      {attendee.host && (
        <Label style={{ position: "absolute" }} color="orange" ribbon="right">
          Host
        </Label>
      )}
      <Item.Image size="tiny" src={attendee.photoURL} />
      <Item.Content verticalAlign="middle">
        <Item.Header as="h3">
          <Link to={`/profile/${attendee.id}`}>{attendee.displayName}</Link>
        </Item.Header>
      </Item.Content>
    </Item>
  ))

const EventDetailSidebar = ({ attendees }) => (
  <div>
    <Segment
      textAlign="center"
      style={{ border: "none" }}
      attached="top"
      secondary
      inverted
      color="teal"
    >
      {attendees && attendees.length}{" "}
      {attendees && attendees.length === 1 ? "Person is" : "People are"} Going.
    </Segment>
    <Segment attached>
      <List relaxed divided>
        {renderAttendeeList(attendees)}
      </List>
    </Segment>
  </div>
)

export default EventDetailSidebar
