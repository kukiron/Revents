import React from "react"
import { Grid, Segment, Header, Image } from "semantic-ui-react"

import { renderPhotos } from "./helpers"

const UserDetailPhotos = ({ photos }) => (
  <Grid.Column width={12}>
    <Segment attached>
      <Header icon="image" content="Photos" />

      <Image.Group size="small">
        {photos && photos.length > 0 && renderPhotos(photos)}
      </Image.Group>
    </Segment>
  </Grid.Column>
)

export default UserDetailPhotos
