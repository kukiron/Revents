import React from "react"
import { Link } from "react-router-dom"
import { Grid, Segment, Button } from "semantic-ui-react"

const UserDetailSidebar = ({ isCurrentUser, profile }) => (
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
      ) : (
        <Button
          color="teal"
          fluid
          basic
          content={`Follow ${profile.displayName}`}
        />
      )}
    </Segment>
  </Grid.Column>
)

export default UserDetailSidebar
