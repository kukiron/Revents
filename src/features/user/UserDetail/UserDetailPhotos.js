import React from "react"
import LazyLoad from "react-lazyload"
import { Grid, Segment, Header, Image } from "semantic-ui-react"

const renderPhotos = photos =>
  photos &&
  photos.length > 0 &&
  photos.map(photo => (
    <LazyLoad key={photo.id} placeholder={<Image src="/assets/user.png" />}>
      <Image src={photo.url} />
    </LazyLoad>
  ))

const UserDetailPhotos = ({ photos }) => (
  <Grid.Column width={12}>
    <Segment attached>
      <Header icon="image" content="Photos" />

      <Image.Group size="small">{renderPhotos(photos)}</Image.Group>
    </Segment>
  </Grid.Column>
)

export default UserDetailPhotos
