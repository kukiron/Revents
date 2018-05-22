import React, { Component } from "react"
import { connect } from "react-redux"
import { Segment, Form, Button } from "semantic-ui-react"
import cuid from "cuid"

import { createEvent, updateEvent } from "../eventActions"

const emptyEvent = {
  title: "",
  date: "",
  city: "",
  venue: "",
  hostedBy: ""
}
class EventForm extends Component {
  state = { event: Object.assign({}, this.props.event) }

  handleInputChange = e => {
    const newEvent = this.state.event
    newEvent[e.target.name] = e.target.value

    this.setState({ event: newEvent })
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { event } = this.state
    const { createEvent, updateEvent, history } = this.props
    if (event.id) {
      updateEvent(event)
      history.goBack()
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      }
      createEvent(newEvent)
      history.push("/events")
    }
  }

  render() {
    const { event } = this.state

    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              value={event.title}
              placeholder="Event Title"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              type="date"
              name="date"
              value={event.date}
              placeholder="Event Date"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={event.city}
              placeholder="City event is taking place"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={event.venue}
              placeholder="Enter the Venue of the event"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={event.hostedBy}
              placeholder="Enter the name of person hosting"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  let event = emptyEvent

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return { event }
}

export default connect(mapStateToProps, { createEvent, updateEvent })(EventForm)
