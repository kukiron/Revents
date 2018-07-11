import React from "react"
import { Grid, Segment, Header, List, Item, Icon } from "semantic-ui-react"
import format from "date-fns/format"

const getFirstName = fullName => fullName && fullName.split(" ")[0]

const renderInterests = interests =>
  interests &&
  interests.map((interest, index) => (
    <Item key={index}>
      <Icon name="heart" />
      <Item.Content>{interest}</Item.Content>
    </Item>
  ))

const UserDetailDescription = ({ profile }) => (
  <Grid.Column width={12}>
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
  </Grid.Column>
)

export default UserDetailDescription
