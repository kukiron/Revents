import React from "react"
import { Segment, Header, Image } from "semantic-ui-react"

import { renderPhotos } from "./helpers"

const UserDetailPhotos = ({ photos }) => (
  <Segment attached>
    <Header icon="image" content="Photos" />

    <Image.Group size="small">
      {photos && photos.length > 0 && renderPhotos(photos)}
    </Image.Group>
  </Segment>
)

export default UserDetailPhotos
