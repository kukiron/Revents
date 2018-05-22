import React from "react"
import { connect } from "react-redux"
import { Grid } from "semantic-ui-react"

import EventDetailHeader from "./EventDetailHeader"
import EventDetailInfo from "./EventDetailInfo"
import EventDetailChat from "./EventDetailChat"
import EventDetailSidebar from "./EventDetailSidebar"

const EventDetail = ({ event }) => (
  <Grid>
    <Grid.Column width={10}>
      <EventDetailHeader event={event} />
      <EventDetailInfo event={event} />
      <EventDetailChat />
    </Grid.Column>
    <Grid.Column width={6}>
      <EventDetailSidebar attendees={event.attendees} />
    </Grid.Column>
  </Grid>
)

const mapStateToProps = ({ events }, { match: { params } }) => ({
  event:
    (events.length && events.filter(event => event.id === params.id)[0]) || {}
})

export default connect(mapStateToProps)(EventDetail)
