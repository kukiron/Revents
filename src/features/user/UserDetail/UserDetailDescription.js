import React from "react"
import { Segment, Grid, Header, List } from "semantic-ui-react"
import format from "date-fns/format"

import { getFirstName, renderInterests } from "./helpers"

const UserDetailDescription = ({ profile }) => (
  <Segment>
    <Grid columns={2}>
      <Grid.Column width={10}>
        <Header
          icon="smile"
          content={`About ${getFirstName(profile.displayName)}`}
        />
        <p>
          I am a: <strong>{profile.occupation || "tbn"}</strong>
        </p>
        <p>
          Originally from <strong>{profile.origin || "tbn"}</strong>
        </p>
        <p>
          Member Since:{" "}
          <strong>{format(profile.createdAt, "dddd Do MMMM")}</strong>
        </p>
        <p>{profile.about || "No detail about this user"}</p>
      </Grid.Column>
      <Grid.Column width={6}>
        <Header icon="heart outline" content="Interests" />
        <List>{renderInterests(profile.interests)}</List>
      </Grid.Column>
    </Grid>
  </Segment>
)

export default UserDetailDescription
