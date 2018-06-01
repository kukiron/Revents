import React from "react"
import { Item, Icon, Image } from "semantic-ui-react"

export default {
  getFirstName: fullName => fullName.split(" ")[0],
  renderInterests: interests =>
    interests.map((interest, index) => (
      <Item key={index}>
        <Icon name="heart" />
        <Item.Content>{interest}</Item.Content>
      </Item>
    )),
  query: ({ auth }) => [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ],
  renderPhotos: photos =>
    photos.map(photo => <Image key={photo.id} src={photo.url} />)
}
