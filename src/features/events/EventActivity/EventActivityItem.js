import React, { Component } from "react"
import { Feed } from "semantic-ui-react"
import { Link } from "react-router-dom"
import distanceInWordsToNow from "date-fns/distance_in_words_to_now"

class EventActivityItem extends Component {
  hostName = eventActivity => (
    <Feed.User as={Link} to={{ pathname: `/profile/${eventActivity.hostUid}` }}>
      {eventActivity.hostedBy}
    </Feed.User>
  )

  eventTitle = eventActivity => (
    <Link to={{ pathname: `/event/${eventActivity.eventId}` }}>
      {eventActivity.title}
    </Link>
  )

  renderSummary = activity => {
    switch (activity.type) {
      case "newEvent":
        return (
          <div>
            New Event! {this.hostName(activity)} is hosting{" "}
            {this.eventTitle(activity)}
          </div>
        )
      case "cancelledEvent":
        return (
          <div>
            Event Cencelled! {this.hostName(activity)} has cancelled{" "}
            {this.eventTitle(activity)}
          </div>
        )
      default:
        return
    }
  }

  render() {
    const { activity } = this.props
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || "/assets/user.png"} alt="" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {distanceInWordsToNow(activity.timestamp)} ago
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    )
  }
}

export default EventActivityItem
