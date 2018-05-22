import React, { Component } from "react"
import { connect } from "react-redux"
import { Grid } from "semantic-ui-react"

import EventList from "../EventList"
import { deleteEvent } from "../eventActions"

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId)
  }

  render() {
    const { events } = this.props

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} onDeleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
    )
  }
}

const mapStateToProps = ({ events }) => ({ events })

export default connect(mapStateToProps, {
  deleteEvent
})(EventDashboard)
