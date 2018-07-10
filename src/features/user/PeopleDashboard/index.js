import React from "react"
import { Grid, Segment, Header, Card } from "semantic-ui-react"
import PersonCard from "./PersonCard"

const PeopleDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="People following me" />
          <Card.Group itemsPerRow={8} stackable>
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
          </Card.Group>
        </Segment>
        <Segment>
          <Header dividing content="People I'm following" />
          <Card.Group itemsPerRow={8} stackable>
            <PersonCard />
            <PersonCard />
            <PersonCard />
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default PeopleDashboard
