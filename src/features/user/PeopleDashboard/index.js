import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { Grid, Segment, Header, Card } from "semantic-ui-react"

import PersonCard from "./PersonCard"

const query = ({ auth }) => [
  {
    collection: "users",
    doc: auth.uid,
    subcollections: [{ collection: "following" }],
    storeAs: "following"
  },
  {
    collection: "users",
    doc: auth.uid,
    subcollections: [{ collection: "followers" }],
    storeAs: "followers"
  }
]

const PeopleDashboard = ({ followings, followers }) => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="People following me" />
          <Card.Group itemsPerRow={8} stackable>
            {followers &&
              followers.map(follower => (
                <PersonCard key={follower.id} user={follower} />
              ))}
          </Card.Group>
        </Segment>
        <Segment>
          <Header dividing content="People I am following" />
          <Card.Group itemsPerRow={8} stackable>
            {followers &&
              followings.map(following => (
                <PersonCard key={following.id} user={following} />
              ))}
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = ({ firebase, firestore }) => ({
  followings: firestore.ordered.following,
  followers: firestore.ordered.followers,
  auth: firebase.auth
})

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => query(props))
)(PeopleDashboard)
