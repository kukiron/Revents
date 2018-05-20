import React, { Component } from "react"
import { Grid, Button } from "semantic-ui-react"
import cuid from "cuid"

import EventList from "../EventList"
import EventForm from "../EventForm"
import eventsDashboard from "./eventData"

class EventDashboard extends Component {
  state = {
    events: eventsDashboard,
    selectedEvent: null,
    isOpen: false
  }

  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    })
  }

  handleCancel = () => {
    this.setState({ isOpen: false })
  }

  handleCreateEvent = newEvent => {
    newEvent.id = cuid()
    newEvent.hostPhotoURL = "/assets/user.png"
    const updatedEvent = [...this.state.events, newEvent]

    this.setState({
      events: updatedEvent,
      isOpen: false
    })
  }

  handleUpdateEvent = updatedEvent => {
    const { events } = this.state

    this.setState({
      events: events.map(
        event =>
          event.id === updatedEvent.id ? Object.assign({}, updatedEvent) : event
      ),
      isOpen: false,
      selectedEvent: null
    })
  }

  handleViewEvent = eventToView => () => {
    this.setState({
      selectedEvent: eventToView,
      isOpen: true
    })
  }

  handleDeleteEvent = eventId => () => {
    const updatedEvents = this.state.events.filter(
      event => event.id !== eventId
    )
    this.setState({ events: updatedEvents })
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={this.state.events}
            onViewEvent={this.handleViewEvent}
            onDeleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content="Create Event"
            onClick={this.handleFormOpen}
          />
          {this.state.isOpen && (
            <EventForm
              selectedEvent={this.state.selectedEvent}
              updateEvent={this.handleUpdateEvent}
              createEvent={this.handleCreateEvent}
              handleCancel={this.handleCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

export default EventDashboard
