import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase"
import { Grid } from "semantic-ui-react"

import EventDetailHeader from "./EventDetailHeader"
import EventDetailInfo from "./EventDetailInfo"
import EventDetailChat from "./EventDetailChat"
import EventDetailSidebar from "./EventDetailSidebar"
import { objToArr, createDataTree } from "../../../app/common/utils/helpers"
import { goingToEvent, cancellGoingToEvent } from "../../user/userActions"
import { addEventComment } from "../eventActions"

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
    const {
      auth,
      event,
      goingToEvent,
      cancellGoingToEvent,
      addEventComment,
      eventChat
    } = this.props
    const attendees = event && event.attendees && objToArr(event.attendees)
    const isHost = event.hostUid === auth.uid
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)
    const commentTree = !isEmpty(eventChat) && createDataTree(eventChat)

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
          <EventDetailChat
            eventChat={commentTree}
            addEventComment={addEventComment}
            eventId={event.id}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (
  { firestore: { ordered }, firebase: { auth, data } },
  { match }
) => ({
  auth,
  event: (ordered.events && ordered.events[0]) || {},
  eventChat:
    !isEmpty(data.event_chat) && objToArr(data.event_chat[match.params.id])
})

export default compose(
  withFirestore,
  connect(mapStateToProps, {
    goingToEvent,
    cancellGoingToEvent,
    addEventComment
  }),
  firebaseConnect(({ match }) => [`event_chat/${match.params.id}`])
)(EventDetail)
