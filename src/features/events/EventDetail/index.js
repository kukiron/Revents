import React, { Component } from "react"
import { connect } from "react-redux"
import { withFirestore } from "react-redux-firebase"
import { Grid } from "semantic-ui-react"

import EventDetailHeader from "./EventDetailHeader"
import EventDetailInfo from "./EventDetailInfo"
import EventDetailChat from "./EventDetailChat"
import EventDetailSidebar from "./EventDetailSidebar"
import { objToArr } from "../../../app/common/utils/helpers"
import { goingToEvent, cancellGoingToEvent } from "../../user/userAction"

class EventDetail extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props
    await firestore.setListener(`events/${match.params.id}`)
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props
    await firestore.setListener(`events/${match.params.id}`)
  }

  render() {
    const { event, auth, goingToEvent, cancellGoingToEvent } = this.props
    const attendees = event && event.attendees && objToArr(event.attendees)
    const isHost = event.hostUid === auth.uid
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancellGoingToEvent={cancellGoingToEvent}
          />
          <EventDetailInfo event={event} />
          <EventDetailChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ firestore: { ordered }, firebase }) => {
  let event = {}
  if (ordered.events) {
    event = ordered.events[0]
  }

  return {
    event,
    auth: firebase.auth
  }
}

export default withFirestore(
  connect(mapStateToProps, { goingToEvent, cancellGoingToEvent })(EventDetail)
)
