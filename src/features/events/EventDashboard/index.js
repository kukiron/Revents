import React, { Component } from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { Grid, Loader } from "semantic-ui-react"

import EventList from "../EventList"
import EventActivity from "../EventActivity"
import LoadingSpinner from "../../../app/layout/LoadingSpinner"
import { getEventsForDashboard } from "../eventActions"

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    initialLoading: true,
    loadedEvents: []
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

  render() {
    const { loading } = this.props
    const { initialLoading, loadedEvents, moreEvents } = this.state

    if (initialLoading) return <LoadingSpinner inverted={true} />

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            loading={loading}
            moreEvents={moreEvents}
            events={loadedEvents}
            getNextEvents={this.getNextEvents}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
})

export default connect(mapStateToProps, { getEventsForDashboard })(
  firestoreConnect([{ collection: "events" }])(EventDashboard)
)
