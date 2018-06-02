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
import { userDetailQuery } from "./helpers"

class UserDetailedPage extends Component {
  render() {
    const { profile, photos, auth, match, requesting } = this.props
    const isCurrentUser = auth.uid === match.params.id
    const isLoading = Object.values(requesting).some(a => a === true)

    if (isLoading) return <LoadingSpinner inverted={true} />

    return (
      <Grid>
        <Grid.Column width={16}>
          <UserDetailHeader profile={profile} />
        </Grid.Column>

        <Grid.Column width={12}>
          <UserDetailDescription profile={profile} />
        </Grid.Column>
        <Grid.Column width={4}>
          <UserDetailSidebar isCurrentUser={isCurrentUser} profile={profile} />
        </Grid.Column>

        <Grid.Column width={12}>
          {<UserDetailPhotos photos={photos} />}
        </Grid.Column>

        <Grid.Column width={12}>
          <UserDetailEvents />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ auth, firebase, firestore }, { match }) => {
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
    auth: firebase.auth,
    photos: firestore.ordered.photos,
    requesting: firestore.status.requesting
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((auth, userUid) => userDetailQuery(auth, userUid))
)(UserDetailedPage)
