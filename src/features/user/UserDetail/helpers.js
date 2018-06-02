import React from "react"
import LazyLoad from "react-lazyload"
import { Item, Icon, Image } from "semantic-ui-react"

export const getFirstName = fullName => fullName && fullName.split(" ")[0]

export const renderInterests = interests =>
  interests &&
  interests.map((interest, index) => (
    <Item key={index}>
      <Icon name="heart" />
      <Item.Content>{interest}</Item.Content>
    </Item>
  ))

export const renderPhotos = photos =>
  photos &&
  photos.map(photo => (
    <LazyLoad key={photo.id} placeholder={<Image src="/assets/user.png" />}>
      <Image src={photo.url} />
    </LazyLoad>
  ))

export const userDetailQuery = ({ auth, userUid }) => {
  if (userUid !== null) {
    return [
      {
        collection: "users",
        doc: userUid,
        storeAs: "profile"
      },
      {
        collection: "users",
        doc: userUid,
        subcollections: [{ collection: "photos" }],
        storeAs: "photos"
      }
    ]
  }

  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ]
}
