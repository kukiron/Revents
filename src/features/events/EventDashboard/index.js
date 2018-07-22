import React, { Component } from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { Grid, Loader } from "semantic-ui-react"

import EventList from "../EventList"
import EventActivity from "../EventActivity"
import LoadingSpinner from "../../../app/layout/LoadingSpinner"
import { getEventsForDashboard } from "../eventActions"

const query = [
  {
    collection: "activity",
    orderBy: ["timestamp", "desc"],
    limit: 5
  }
]

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    initialLoading: true,
    loadedEvents: [],
    contextRef: {}
  }

  async componentDidMount() {
    const next = await this.props.getEventsForDashboard()

    if (next && next.docs && next.docs.length > 1) {
      this.setState({ moreEvents: true, initialLoading: false })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      })
    }
  }

  getNextEvents = async () => {
    const { events } = this.props
    let lastEvent = events && events[events.length - 1]
    let next = await this.props.getEventsForDashboard(lastEvent)

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({ moreEvents: false })
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const { loading, activities } = this.props
    const { initialLoading, loadedEvents, moreEvents } = this.state

    if (initialLoading) return <LoadingSpinner inverted={true} />

    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.handleContextRef}>
            <EventList
              loading={loading}
              moreEvents={moreEvents}
              events={loadedEvents}
              getNextEvents={this.getNextEvents}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity
            activities={activities}
            contextRef={this.state.contextRef}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ events, async, firestore }) => ({
  events,
  loading: async.loading,
  activities: firestore.ordered.activity
})

export default connect(
  mapStateToProps,
  { getEventsForDashboard }
)(firestoreConnect(query)(EventDashboard))
