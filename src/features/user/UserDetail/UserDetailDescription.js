import React from "react"
import { Segment, Grid, Header, List } from "semantic-ui-react"
import format from "date-fns/format"

import { getFirstName, renderInterests } from "./helpers"

const UserDetailDescription = ({
  profile: { displayName, occupation, origin, createdAt, about, interests }
}) => (
  <Segment>
    <Grid columns={2}>
      <Grid.Column width={10}>
        <Header icon="smile" content={`About ${getFirstName(displayName)}`} />
        <p>
          I am a: <strong>{occupation || "tbn"}</strong>
        </p>
        <p>
          Originally from <strong>{origin || "tbn"}</strong>
        </p>
        <p>
          Member Since: <strong>{format(createdAt, "dddd Do MMMM")}</strong>
        </p>
        <p>{about || "No detail about this user"}</p>
      </Grid.Column>
      <Grid.Column width={6}>
        <Header icon="heart outline" content="Interests" />
        <List>{renderInterests(interests)}</List>
      </Grid.Column>
    </Grid>
  </Segment>
)

export default UserDetailDescription
