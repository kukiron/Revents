import React, { Component } from "react"
import { Segment, Form, Button } from "semantic-ui-react"

class EventForm extends Component {
  state = {
    event: {
      title: "",
      date: "",
      city: "",
      venue: "",
      hostedBy: ""
    }
  }

  onFormSubmit = e => {
    e.preventDefault()
    console.log(this.state.event)
  }

  handleInputChange = e => {
    const newEvent = this.state.event
    newEvent[e.target.name] = e.target.value

    this.setState({ event: newEvent })
  }

  render() {
    const { handleCancel } = this.props
    const { event } = this.state

    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
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
              event={event.hostedBy}
              placeholder="Enter the name of person hosting"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Segment>
    )
  }
}

export default EventForm
