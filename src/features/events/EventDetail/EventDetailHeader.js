import React from "react"
import { Link } from "react-router-dom"
import format from "date-fns/format"
import { Segment, Image, Item, Header, Button, Label } from "semantic-ui-react"

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
}

const EventDetailHeader = ({
  event,
  isHost,
  isGoing,
  loading,
  goingToEvent,
  authenticated,
  openModal,
  cancellGoingToEvent
}) => (
  <Segment.Group>
    <Segment basic attached="top" style={{ padding: "0" }}>
      <Image
        src={`/assets/categoryImages/${event.category}.jpg`}
        fluid
        style={{ filter: "brightness(30%)" }}
      />
      <Segment basic style={eventImageTextStyle}>
        <Item.Group>
          <Item>
            <Item.Content>
              <Header
                size="huge"
                content={event.title}
                style={{ color: "white" }}
              />
              <p>{format(event.date, "dddd Do MMMM")}</p>
              <p>
                Hosted by <strong>{event.hostedBy}</strong>
              </p>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment>

    <Segment attached="bottom">
      {!isHost &&
        !event.cancelled && (
          <div>
            {isGoing ? (
              <Button onClick={() => cancellGoingToEvent(event)}>
                Cancel My Place
              </Button>
            ) : authenticated ? (
              <Button
                loading={loading}
                onClick={() => goingToEvent(event)}
                color="teal"
              >
                JOIN THIS EVENT
              </Button>
            ) : (
              <Button
                loading={loading}
                onClick={() => openModal("UnauthModal")}
                color="teal"
              >
                JOIN THIS EVENT
              </Button>
            )}
          </div>
        )}

      {isHost && (
        <Button as={Link} to={`/manage/${event.id}`} color="orange">
          Manage Event
        </Button>
      )}

      {event.cancelled &&
        !isHost && (
          <Label
            size="large"
            color="red"
            content="This event has been cancelled"
          />
        )}
    </Segment>
  </Segment.Group>
)

export default EventDetailHeader
