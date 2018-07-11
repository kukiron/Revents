import React from "react"
import { Link } from "react-router-dom"
import { Grid, Segment, Button } from "semantic-ui-react"

const UserDetailSidebar = ({
  isCurrentUser,
  profile,
  isFollowing,
  followUser,
  unfollowUser
}) => (
  <Grid.Column width={4}>
    <Segment>
      {isCurrentUser ? (
        <Button
          as={Link}
          to={"/settings/basic"}
          color="teal"
          fluid
          basic
          content="Edit Profile"
        />
      ) : isFollowing ? (
        <Button
          color="teal"
          fluid
          basic
          content="Unfollow"
          onClick={() => unfollowUser(profile)}
        />
      ) : (
        <Button
          color="teal"
          fluid
          basic
          content={`Follow ${profile.displayName}`}
          onClick={() => followUser(profile)}
        />
      )}
    </Segment>
  </Grid.Column>
)

export default UserDetailSidebar
