import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect, isEmpty } from "react-redux-firebase"
import { Grid } from "semantic-ui-react"

import LoadingSpinner from "../../../app/layout/LoadingSpinner"
import UserDetailHeader from "./UserDetailHeader"
import UserDetailDescription from "./UserDetailDescription"
import UserDetailSidebar from "./UserDetailSidebar"
import UserDetailPhotos from "./UserDetailPhotos"
import UserDetailEvents from "./UserDetailEvents"
import { userDetailQuery } from "../userDetailQuery"
import { getUserEvents, followUser, unfollowUser } from "../userActions"

class UserDetailedPage extends Component {
  async componentDidMount() {
    const { getUserEvents, userUid } = this.props
    await getUserEvents(userUid)
  }

  changeTab = (e, { activeIndex }) => {
    const { getUserEvents, userUid } = this.props
    getUserEvents(userUid, activeIndex)
  }

  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      events,
      eventsLoading,
      following,
      followUser,
      unfollowUser
    } = this.props
    const isCurrentUser = auth.uid === match.params.id
    const isLoading = Object.values(requesting).some(a => a === true)
    const isFollowing = !isEmpty(following)

    if (isLoading) return <LoadingSpinner inverted={true} />

    return (
      <Grid>
        <UserDetailHeader profile={profile} />
        <UserDetailDescription profile={profile} />
        <UserDetailSidebar
          isCurrentUser={isCurrentUser}
          profile={profile}
          isFollowing={isFollowing}
          followUser={followUser}
          unfollowUser={unfollowUser}
        />
        <UserDetailPhotos photos={photos} />
        <UserDetailEvents
          events={events}
          eventsLoading={eventsLoading}
          changeTab={this.changeTab}
        />
      </Grid>
    )
  }
}

const mapStateToProps = (
  { auth, firebase, firestore, events, async },
  { match }
) => {
  let userUid = null
  let profile = {}

  if (match.params.id === auth.uid) {
    profile = firebase.profile
  } else {
    profile =
      !isEmpty(firestore.ordered.profile) && firestore.ordered.profile[0]
    userUid = match.params.id
  }

  return {
    profile,
    userUid,
    events,
    eventsLoading: async.loading,
    auth: firebase.auth,
    photos: firestore.ordered.photos,
    requesting: firestore.status.requesting,
    following: firestore.ordered.following
  }
}

export default compose(
  connect(mapStateToProps, { getUserEvents, followUser, unfollowUser }),
  firestoreConnect(props => userDetailQuery(props))
)(UserDetailedPage)
