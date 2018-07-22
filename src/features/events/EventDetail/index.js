import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { toastr } from "react-redux-toastr"
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase"
import { Grid } from "semantic-ui-react"

import EventDetailHeader from "./EventDetailHeader"
import EventDetailInfo from "./EventDetailInfo"
import EventDetailChat from "./EventDetailChat"
import EventDetailSidebar from "./EventDetailSidebar"
import LoadingSpinner from "../../../app/layout/LoadingSpinner"
import { objToArr, createDataTree } from "../../../app/common/utils/helpers"
import { goingToEvent, cancellGoingToEvent } from "../../user/userActions"
import { addEventComment } from "../eventActions"
import { openModal } from "../../modals/modalActions"

const actions = {
  goingToEvent,
  cancellGoingToEvent,
  addEventComment,
  openModal
}

class EventDetail extends Component {
  state = { initialLoading: true }

  async componentDidMount() {
    const { firestore, match } = this.props
    const event = await firestore.get(`events/${match.params.id}`)
    if (!event.exists) {
      toastr.error("Not found", "This isn't the event you're looking for")
      this.props.history.push("/error")
    }
    await firestore.setListener(`events/${match.params.id}`)
    this.setState({ initialLoading: false })
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props
    await firestore.setListener(`events/${match.params.id}`)
  }

  render() {
    const {
      auth,
      event,
      match,
      loading,
      requesting,
      goingToEvent,
      cancellGoingToEvent,
      addEventComment,
      eventChat,
      openModal
    } = this.props
    const attendees =
      event &&
      event.attendees &&
      objToArr(event.attendees).sort((a, b) => a.joinDate - b.joinDate)
    const isHost = event.hostUid === auth.uid
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)
    const commentTree = !isEmpty(eventChat) && createDataTree(eventChat)
    const authenticated = auth.isLoaded && !auth.isEmpty
    const loadingEvent = requesting[`events/${match.params.id}`]

    if (loadingEvent || this.state.initialLoading)
      return <LoadingSpinner inverted={true} />

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            loading={loading}
            goingToEvent={goingToEvent}
            cancellGoingToEvent={cancellGoingToEvent}
            authenticated={authenticated}
            openModal={openModal}
          />
          <EventDetailInfo event={event} />
          {authenticated && (
            <EventDetailChat
              eventChat={commentTree}
              addEventComment={addEventComment}
              eventId={event.id}
            />
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (
  { firestore: { ordered, status }, firebase: { auth, data }, async },
  { match }
) => ({
  auth,
  loading: async.loading,
  requesting: status.requesting,
  event: (ordered.events && ordered.events[0]) || {},
  eventChat:
    !isEmpty(data.event_chat) && objToArr(data.event_chat[match.params.id])
})

export default compose(
  withFirestore,
  connect(
    mapStateToProps,
    actions
  ),
  firebaseConnect(
    ({ auth, match }) =>
      auth.isLoaded && !auth.isEmpty && [`event_chat/${match.params.id}`]
  )
)(EventDetail)
